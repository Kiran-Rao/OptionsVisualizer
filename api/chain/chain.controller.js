const R = require('ramda');
const bluebird = require('bluebird');
const winston = require('winston');
const tradier = require('../services/tradier');

const controller = bluebird.coroutine(function *(req) {
  const symbol = req.query['symbol'];
  const company = yield tradier.lookupSymbol(symbol);

  if (!company || company.length > 1) {
    winston.error('chain.controller', symbol, 'doesnt correspond to a single company');
    throw 404;
  }

  const expirations = yield tradier.getExpirations(symbol);
  const prunedExpirations = R.take(10, expirations);
  return bluebird.map(prunedExpirations, tradier.getChain(symbol), { concurrency: 12 })
    .then(R.flatten);
});

module.exports = controller;
