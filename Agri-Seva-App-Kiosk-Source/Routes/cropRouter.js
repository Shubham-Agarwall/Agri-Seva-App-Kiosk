const express = require('express');
const debug = require('debug')('app:cropPageRouter');

const cropRouter = express.Router();


function router(crops) {
  cropRouter.route('/')
    .get((req, res) => {
      res.render(
        'cropPagen',
        {
          title: 'Crops',
          crops,
        },
      );
      debug('Connected to cropPage');
    });

  cropRouter.route('/:id')
    .get((req, res) => {
      const { id } = req.params;
      const index = crops.findIndex((x) => x.name === id);
      res.render(
        'cropInfoPagen',
        {
          title: id,
          cropInfo: crops[index],
        },
      );
    });
  return cropRouter;
}

module.exports = router;
