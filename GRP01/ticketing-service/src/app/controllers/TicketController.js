const connection = require('../../database/connection');
const Logger = require('../../lib/logger');

const fns = require('date-fns')

class TicketController {
  async store(req, res) {
    Logger.header('Controller - Tickets - Store');

    const { type } = req.body;

    const timeNow = new Date();

    const [validNumberByType] = await connection('ticket')
      .select('ticket.*')
      .where({ 'type': type })
      .andWhere('created_at', 'like', `%${fns.format(timeNow, 'yyyy-MM-dd')}%`)
      .orderBy('number', 'desc')
      .limit(1);

    let increment = !validNumberByType ? 1 : validNumberByType.number + 1;

    const updatedName = `${fns.format(timeNow, 'yyMMdd')}-${type}${increment}`;

    const ticket = {
      name: updatedName,
      number: increment,
      created_at: timeNow,
      type: type,
      anserewed: false,
      called: false,
      desk: 0
    };

    Logger.log(
      `[${ticket.name}][${ticket.number}][${ticket.created_at}][${ticket.type}][${ticket.anserewed}][${ticket.desk}]`
    );

    const [ticketId] = await connection('ticket').insert(ticket, 'id');
    
    Logger.success('[200]');

    return res.json({
      id: ticketId,
      ...ticket,
    });
  }

  async list(req, res) {
    Logger.header('Controller - Tickets - List');

    const timeNow = new Date()

    const tickets = await connection('ticket')
      .select('ticket.*')
      .where('created_at', 'like', `%${fns.format(timeNow, 'yyyy-MM-dd')}%`)
      .andWhere('called', false)
    
    const priorityTickets = tickets.filter((ticket)  => ticket.type === 'SP')
    const generalTickets = tickets.filter(ticket  => ticket.type === 'SG')
    const testTickets = tickets.filter(ticket  => ticket.type === 'SE')

    Logger.success('[200]');
    return res.json({
      priority: priorityTickets,
      general: generalTickets,
      test: testTickets
    });

  }

  async callTicket(req, res) {
    Logger.header('Controller - Tickets - callTicket');

    const { desk } = req.body;

    const now = new Date()

    if (!desk) {
      return res.status(400).json({ error: 'Desk is required' });
    }

    const tickets = await connection('ticket')
      .select('ticket.*')
      .where('created_at', 'like', `%${fns.format(now, 'yyyy-MM-dd')}%`)
      .andWhere('called', '=', 0);
    
    const priorityTickets = [];
    const generalTickets = [];
    const testTickets = [];

    tickets.forEach(ticket => {
      if (ticket.type === 'SP') {
        priorityTickets.push(ticket)
      } else if (ticket.type === 'SG') {
        generalTickets.push(ticket)
      } else {
        testTickets.push(ticket)
      }
    })

    const [lastCalled] = await connection('last_called')
      .select('last_called.*')
      .where('created_at', 'like', `%${fns.format(now, 'yyyy-MM-dd')}%`)
      .orderBy('id', 'desc');

    if (priorityTickets.length > 0 && testTickets.length === 0 && generalTickets.length === 0) {
      await connection('ticket').update({ called: true, desk, updated_at: now }).where({ id: priorityTickets[0].id });

      await connection('last_called').insert({ ticket_id: priorityTickets[0].id, desk, type: 'SP', created_at: now });

      return res.json({ 
        ticket: priorityTickets[0].name,
        desk
      });
    }

    if (testTickets.length > 0 && priorityTickets.length === 0 && generalTickets.length === 0) {
      await connection('ticket').update({ called: true, desk, updated_at: now }).where({ id: testTickets[0].id });

      await connection('last_called').insert({ ticket_id: testTickets[0].id, desk, type: 'SE', created_at: now });

      return res.json({ 
        ticket: testTickets[0].name,
        desk
      });
    }

    if (generalTickets.length > 0 && testTickets.length === 0 && priorityTickets.length === 0) {
      await connection('ticket').update({ called: true, desk, updated_at: now }).where({ id: generalTickets[0].id });

      await connection('last_called').insert({ ticket_id: generalTickets[0].id, desk, type: 'SG', created_at: now });

      return res.json({ 
        ticket: generalTickets[0].name,
        desk
      });
    }
    
    if (priorityTickets.length > 0 && (!lastCalled || lastCalled && lastCalled.type !== 'SP')) {
      await connection('ticket').update({ called: true, desk, updated_at: now }).where({ id: priorityTickets[0].id });

      await connection('last_called').insert({ ticket_id: priorityTickets[0].id, desk, type: 'SP', created_at: now });

      return res.json({ 
        ticket: priorityTickets[0].name,
        desk
      });
    }

    if (testTickets.length > 0 && (!lastCalled || lastCalled && lastCalled.type !== 'SE' || lastCalled && lastCalled.type !== 'SG')) {
      await connection('ticket').update({ called: true, desk, updated_at: now }).where({ id: testTickets[0].id });

      await connection('last_called').insert({ ticket_id: testTickets[0].id, desk, type: 'SE', created_at: now });

      return res.json({ 
        ticket: testTickets[0].name,
        desk
      });
    }

    if (generalTickets.length > 0 && (!lastCalled || lastCalled && lastCalled.type !== 'SE' || lastCalled && lastCalled.type !== 'SG')) {
      await connection('ticket').update({ called: true, desk, updated_at: now }).where({ id: generalTickets[0].id });

      await connection('last_called').insert({ ticket_id: generalTickets[0].id, desk, type: 'SG', created_at: now });

      return res.json({
        ticket: generalTickets[0].name,
        desk
      });
    }

    return res.json({ error: 'No tickets found' });
  }

  async getLastCalledTickets(req, res) {
    Logger.header('Controller - Tickets - getLastCalledTickets');

    const lastCalledTickets = await connection('last_called')
      .select('last_called.*')
      .where('created_at', 'like', `%${fns.format(new Date(), 'yyyy-MM-dd')}%`)
      .orderBy('id', 'desc')
      .limit(5);

    return res.json(lastCalledTickets);
  }

  async generateDailyReport(req, res) {
    Logger.header('Controller - Tickets - generateDailyReport');

    const today = new Date();

    const createdTickets = await connection('ticket')
      .select('ticket.*')
      .where('created_at', 'like', `%${fns.format(today, 'yyyy-MM-dd')}%`);

    const calledTickets = await connection('last_called')
      .select('last_called.*')
      .where('created_at', 'like', `%${fns.format(today, 'yyyy-MM-dd')}%`);

    const detailedReport = createdTickets.map(ticket => {
      return {
        id: ticket.id,
        name: ticket.name,
        number: ticket.number,
        type: ticket.type,
        desk: ticket.desk,
        called: ticket.called,
        created_at: ticket.created_at,
        updated_at: ticket.updated_at,
      }
    })

    return res.json({
      createdTickets: {
        total: createdTickets.length,
        priorityTicketsCreated: createdTickets.filter(ticket => ticket.type === 'SP').length,
        generalTicketsCreated: createdTickets.filter(ticket => ticket.type === 'SG').length,
        testTicketsCreated: createdTickets.filter(ticket => ticket.type === 'SE').length,
      },
      calledTickets: {
        total: calledTickets.length,
        priorityTicketsCalled: calledTickets.filter(ticket => ticket.type === 'SP').length,
        generalTicketsCalled: calledTickets.filter(ticket => ticket.type === 'SG').length,
        testTicketsCalled: calledTickets.filter(ticket => ticket.type === 'SE').length,
      },
      detailedReport
    })
  }
}

module.exports = new TicketController();
