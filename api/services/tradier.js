const request = require('request-promise');
const { TRADIER_KEY } = require('../constants');
const R = require('ramda');
const winston = require('winston');

const tradierHeaders = {
  Accept: 'application/json',
  Authorization: `Bearer ${TRADIER_KEY}`
};

const lookupSymbol = (symbol) => {
  const baseUrl = 'https://sandbox.tradier.com/v1/markets/lookup';
  const uri = `${baseUrl}?q=${symbol}`;
  const options = {
    uri,
    headers: tradierHeaders,
    json: true
  };

  return request(options).then(R.path(['securities', 'security']));
}

const getExpirations = (symbol) => {
  const baseUrl = 'https://sandbox.tradier.com/v1/markets/options/expirations';
  const uri = `${baseUrl}?symbol=${symbol}`;
  const options = {
    uri,
    headers: tradierHeaders,
    json: true
  };

  return request(options).then(R.path(['expirations', 'date']));
};

const bidAskMedian = (security) =>
  R.assoc('mid_price', (security.bid + security.ask) / 2, security);

const formatChain = R.pipe(
  R.path(['options', 'option']),
  R.map(bidAskMedian),
  R.project(['symbol', 'option_type', 'strike', 'expiration_date', 'root_symbol', 'mid_price', 'open_interest', 'volume'])
);

const getChain = R.curry((symbol, expiration) => {
  const baseUrl = 'https://sandbox.tradier.com/v1/markets/options/chains';
  const uri = `${baseUrl}?symbol=${symbol}&expiration=${expiration}`;

  const options = {
    uri,
    headers: tradierHeaders,
    json: true
  };

  return request(options).then(formatChain);
});


module.exports = {
  lookupSymbol,
  getExpirations,
  getChain
};
