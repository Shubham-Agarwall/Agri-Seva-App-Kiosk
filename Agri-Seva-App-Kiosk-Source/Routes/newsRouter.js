const express = require('express');
const debug = require('debug')('app:newsRoutes');

const adminRouter = express.Router();

function router(news) {
  adminRouter.route('/')
    .get((req, res) => {
      res.render(
        'agrinewsn',
        { news },
      );
      debug('agrinews Page loaded');
    });

  return adminRouter;
}

module.exports = router;
