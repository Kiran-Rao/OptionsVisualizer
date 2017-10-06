const express = require('express');
const controller = require('./chain.controller');
const promisify = require('../middleware/promisify-request');

const router = express.Router();
router.post('/', promisify(controller));

module.exports = router;
