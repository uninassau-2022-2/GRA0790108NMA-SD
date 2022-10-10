const connection = require('../../database/connection');
const Logger = require('../../lib/logger');

const { default: format } = require('date-fns/format');

class TicketController {
  async store(req, res) {
    Logger.header('Controller - Tickets - Store');
    const { number, type, answered, desk } = req.body;

    const date = new Date().toISOString()
    const year = format(date, 'yy')
    const month = format(date, 'MM')
    const day = format(date, 'dd')
    const updatedName = `${year}${month}${day}${type}${number}`
    
    const [nameExists] = await connection('ticket')
      .select('ticket.*')
      .where({'ticket.name': updatedName});

    if(nameExists) {
      Logger.error('Ticket already in database');
      return res.status(403).json({ error: 'Ticket already in database' });
    }
    const ticket = {
      name: updatedName,
      number: number,
      date: date,
      type: type,
      answered: answered,
      desk: desk
    };
    
    Logger.log(
      `[${ticket.name}][${ticket.number}][${ticket.date}][${ticket.type}][${ticket.answered}][${ticket.desk}]`
    );
    const [ticketId] = await connection('ticket').insert(ticket, 'id');
    Logger.success('[200]');
    return res.json({
      id: ticketId,
      ...ticket,
    });
  }
}

module.exports = new TicketController();
