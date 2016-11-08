const util = require('./util');

exports = module.exports = (accounts) => {
  /* eslint-disable no-param-reassign */
  accounts.prototype.getTransactions = function getTransactions(id, cb) {
    util.makeGetRequest(this, 'transactions', id, cb);
  };
  /* eslint-enable no-param-reassign */
};
