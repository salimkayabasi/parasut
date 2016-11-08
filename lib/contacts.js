const util = require('./util');

exports = module.exports = (contacts) => {
  /* eslint-disable no-param-reassign */
  contacts.prototype.pastTransactions = function pastTransactions(id, cb) {
    util.makeGetRequest(this, 'past_transactions', id, cb);
  };
  contacts.prototype.outstandingPayments = function outstandingPayments(id, cb) {
    util.makeGetRequest(this, 'outstanding_payments', id, cb);
  };
  /* eslint-enable no-param-reassign */
};
