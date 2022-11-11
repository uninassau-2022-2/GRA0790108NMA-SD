const Router = require('express').Router;
const TicketController = require('./app/controllers/TicketController');

const routes = new Router();

routes.post('/ticket/create', TicketController.store);
routes.get('/ticket/get-tickets', TicketController.list);
routes.get('/ticket/update-tickets', TicketController.update);

module.exports = routes;
