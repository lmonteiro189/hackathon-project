'use strict';

const { Router } = require('express');
const router = new Router();

router.get('chat2', (req, res, next) => {
  res.render('user/chat2');
});

module.exports = router;
