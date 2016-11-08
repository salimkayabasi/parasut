const _ = require('lodash');
const util = require('./util');

const Parasut = function Parasut(clientId, clientSecret, firmNo, email, password) {
  this._clientId = clientId;
  this._clientSecret = clientSecret;
  this._accessToken = '';
  this._refreshToken = '';
  this._email = email;
  this._password = password;
  this._baseUrl = `https://api.parasut.com/v1/${firmNo}`;
  this._request = require('request');
  util.setModel(Parasut, this, 'contacts');
  util.setModel(Parasut, this, 'products');
  util.setModel(Parasut, this, 'invoices', 'sales_invoices');
  util.setModel(Parasut, this, 'accounts');
  util.setModel(Parasut, this, 'categories', 'item_categories');
};

Parasut.prototype.getBaseUrl = function getBaseUrl() {
  return this._baseUrl;
};

require('./auth')(Parasut);

exports = module.exports = Parasut;
