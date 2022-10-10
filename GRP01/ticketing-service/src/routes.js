const Router = require('express').Router;
const TicketController = require('./app/controllers/TicketController');

const routes = new Router();

routes.post('/ticket', TicketController.store);

module.exports = routes;
