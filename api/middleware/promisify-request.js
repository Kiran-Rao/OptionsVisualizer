const winston = require('winston');

const promisify = (promise) => (req, res) => {
  promise(req)
    .then(response => {
      res.json(response);
    })
    .catch(err => {
      winston.error(err);
      res.sendStatus(500)
    });
};

module.exports = promisify;
