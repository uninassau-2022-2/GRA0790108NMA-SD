//require('dotenv/config');

const cors = require('cors');
const express = require('express');
const Youch = require('youch');
require('express-async-errors');
const routes = require('./routes');

class App {
  constructor() {
    this.server = express();

    this.middlewares();
    this.routes();
    this.exceptionHandler();
  }

  middlewares() {
    this.server.use(cors());
    this.server.use(express.json());
  }

  routes() {
    this.server.use(routes);
  }

  exceptionHandler() {
    this.server.use(async (err, req, res) => {
      if (process.env.NODE_ENV === 'development') {
        const errors = await new Youch(err, req).toJSON();

        return res.status(500).json(errors);
      }
      const errors = await new Youch(err, req).toJSON();
      return res.status(500).json(errors);
    });
  }
}

module.exports = new App().server;
