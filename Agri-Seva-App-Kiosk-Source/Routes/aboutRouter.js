const express = require('express');
const debug = require('debug')('app:cropPageRouter');

const aboutRouter = express.Router();

function router() {
  aboutRouter.route('/')
    .get((req, res) => {
      res.render('aboutDevs');
      debug('About page loades and working');
    });
  return aboutRouter;
}

module.exports = router;
