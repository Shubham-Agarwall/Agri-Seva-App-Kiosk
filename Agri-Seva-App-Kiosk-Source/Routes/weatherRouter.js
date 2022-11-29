const express = require('express');
const debug = require('debug')('app:newsRoutes');

const weatherRouter = express.Router();

function router() {
  weatherRouter.route('/')
    .get((req, res) => {
      res.render('weatherPage');
      debug('Connected to weather page');
    });

  return weatherRouter;
}

module.exports = router;
