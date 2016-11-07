var util = require('./util');

var Parasut = function (clientId, clientSecret, firmNo) {
  var self = this;
  self._clientId = clientId || '';
  self._clientSecret = clientSecret || '';
  self._accessToken = '';
  self._refreshToken = '';
  self._firmNo = firmNo || '';
  self._baseUrl = 'https://api.parasut.com/v1/' + firmNo;
  self._request = require('request');
  util.setModel(Parasut, self, 'contacts');
  util.setModel(Parasut, self, 'products');
  util.setModel(Parasut, self, 'sales_invoices', 'invoices');
  util.setModel(Parasut, self, 'accounts');
  util.setModel(Parasut, self, 'categories');
};

Parasut.prototype.getBaseUrl = function () {
  return this._baseUrl;
};

require('./auth')(Parasut);

exports = module.exports = Parasut;
