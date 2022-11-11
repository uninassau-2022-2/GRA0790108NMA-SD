const connection = require('../../database/connection');
const Logger = require('../../lib/logger');

const fns = require('date-fns')

class TicketController {
  async store(req, res) {
    Logger.header('Controller - Tickets - Store');

    // if (fns.getHours(new Date()) < 7 || fns.getHours(new Date()) > 17) {
    //   Logger.error('Cannot print new tickets outside working hours');
    //   return res.status(403).json({ error: 'Cannot print new tickets outside working hours' });
    // }

    const { type } = req.body;

    Logger.log(`${type}`)

    const timeNow = new Date()
    const year = fns.format(timeNow, 'yy')
    const month = fns.format(timeNow, 'MM')
    const day = fns.format(timeNow, 'dd')

    const validNumberByType = await connection('ticket')
      .select('ticket.*')
      .where({ 'type': type })
      .andWhere('date', 'like', `%${fns.format(timeNow, 'yyyy-MM-dd')}%`)
      .orderBy('number', 'desc')
      .limit(1)
    let increment = 0

    increment = validNumberByType[0] === undefined ? 1 : validNumberByType[0].number + 1

    const updatedName = `${year}${month}${day}${type}${increment}`
    Logger.log(`${updatedName}`)

    const [nameExists] = await connection('ticket')
      .select('ticket.*')
      .where({ 'ticket.name': updatedName });
    if (nameExists) {
      Logger.error('Ticket already in database');
      return res.status(403).json({ error: 'Ticket already in database' });
    }

    const ticket = {
      name: updatedName,
      number: increment,
      date: timeNow,
      type: type,
      anserewed: false,
      called: false,
      desk: 0
    };

    Logger.log(
      `[${ticket.name}][${ticket.number}][${ticket.date}][${ticket.type}][${ticket.anserewed}][${ticket.desk}]`
    );

    const [ticketId] = await connection('ticket').insert(ticket, 'id');
    Logger.success('[200]');
    return res.json({
      id: ticketId,
      ...ticket,
    });
  }

  async list(res) {
    Logger.header('Controller - Tickets - List');

    // if (fns.getHours(new Date()) < 7 || fns.getHours(new Date()) > 17) {
    //   Logger.error('Cannot get tickets outside working hours.');
    //   return res.status(403).json({ error: 'Cannot get tickets outside working hours.' });
    // }

    const timeNow = new Date()

    const [tickets] = await connection('ticket')
      .select('ticket.*')
      .where('date', 'like', `%${fns.format(timeNow, 'yyyy-MM-dd')}%`)
      .andWhere('called', false)

    if (!tickets) {
      return res.status(404).json({error: 'No tickets'})
    }
    
    const priorityTickets = tickets.filter((ticket)  => ticket.type === 'SP')
    const generalTickets = tickets.filter(ticket  => ticket.type === 'SG')
    const testTickets = tickets.filter(ticket  => ticket.type === 'SE')

    Logger.success('[200]');
    return res.json({
      priority: {...priorityTickets},
      general: {...generalTickets},
      test: {...testTickets}
    });

  }

  async update(req, res) {
    Logger.header('Controller - Tickets - Update');

    const timeNow = new Date()

    const tickets = await connection('ticket')
      .select('ticket.*')
      .where('date', 'like', `%${fns.format(timeNow, 'yyyy-MM-dd')}%`)

    if (!tickets) {
      return res.json({error: 'no tickets found'})
    }

    const priorityTickets = tickets.filter(ticket => ticket.type === 'SP')
      .filter((t) => t.anserewed === 0)
    const generalTickets = tickets.filter(ticket => ticket.type === 'SG')
      .filter((t) => t.anserewed === 0)
    const testTickets = tickets.filter(ticket => ticket.type === 'SE')
      .filter((t) => t.anserewed === 0)
    
    const lastCalled = await connection('ticket')
      .select('ticket.*')
      .where('date', 'like', `%${fns.format(timeNow, 'yyyy-MM-dd')}%`).andWhere('called', true)

    Logger.log(lastCalled[0])

    const { called } = req.body;

    if (lastCalled[0] === undefined && priorityTickets[0] !== undefined) {
      priorityTickets[0].called = called
      priorityTickets[0].desk = Math.floor(Math.random() * 10) + 1
    }
    if (lastCalled[0] !== undefined) {
      if (lastCalled[0].type === 'SP' || lastCalled[0].type === 'SE') {
        generalTickets[0].called = called
        generalTickets[0].desk = Math.floor(Math.random() * 10) + 1
      }
    }


    return res.status(200).json({
      priority: {...priorityTickets},
      general: {...generalTickets},
      test: {...testTickets}
    });

  }
}

module.exports = new TicketController();
