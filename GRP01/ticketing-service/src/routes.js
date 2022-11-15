const Router = require('express').Router;
const TicketController = require('./app/controllers/TicketController');

const routes = new Router();

routes.post('/ticket/create', TicketController.store);
routes.get('/ticket/get-tickets', TicketController.list);
routes.post('/ticket/call', TicketController.callTicket);
routes.get('/ticket/get-last-called', TicketController.getLastCalledTickets);
routes.get('/ticket/daily', TicketController.generateDailyReport);

module.exports = routes;
