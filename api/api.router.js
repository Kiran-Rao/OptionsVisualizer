const express = require('express');
const api = require('./api.controller');
const chain = require('./chain/chain.router.js');

const router = express.Router();

router.use('/chain', chain);
router.all('/', api);

module.exports = router;
