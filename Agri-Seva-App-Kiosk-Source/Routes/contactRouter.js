const express = require('express');
const debug = require('debug')('app:cropPageRouter');

const contactRouter = express.Router();
express().use(express.urlencoded());

function router() {
  contactRouter.route('/')
    .get((req, res) => {
      res.render('contactPagen');
      debug('Contact page loades and working');
    });
  return contactRouter;
}

module.exports = router;
