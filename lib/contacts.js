const _ = require('lodash');

exports.addPaymentMethods = (contacts) => {
  /* eslint-disable no-param-reassign */
  contacts.prototype.pastTransactions = (id, cb) => {
    const opts = _.clone(this.getRequestOptions());
    opts.url = `${this.getBaseUrl()}/${id}/past_transactions`;
    this._request(opts, this._handler(cb));
  };
  contacts.prototype.outstandingPayments = (id, cb) => {
    const opts = _.clone(this.getRequestOptions());
    opts.url = `${this.getBaseUrl()}/${id}/outstanding_payments`;
    this._request(opts, this._handler(cb));
  };
  /* eslint-enable no-param-reassign */
};
