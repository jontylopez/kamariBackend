const express = require('express');
const router = express.Router();
const bwipjs = require('bwip-js');

// GET /api/barcode/:code
router.get('/:code', (req, res) => {
  const { code } = req.params;

  bwipjs.toBuffer({
    bcid:        'code128',
    text:        code,
    scale:       3,
    height:      10,
    includetext: false
  }, (err, png) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ error: 'Failed to generate barcode' });
    }

    res.set('Content-Type', 'image/png');
    res.send(png);
  });
});

module.exports = router;
