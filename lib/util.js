const _ = require('lodash');

exports.requestHandler = callback =>
  (err, res, body) => {
    if (err) {
      callback(err);
      return;
    }
    if (!_.isObject(body) && res.statusCode >= 400) {
      const msg = _.isEmpty(body) ? res.statusMessage : body;
      const error = new Error(msg);
      error.status = res.status;
      callback(error);
      return;
    }
    callback(null, body);
  };

exports.setModel = (Parasut, parasut, modelName, modelPath) => {
  const Model = function Model() {
    this._parasut = parasut;
    this._request = parasut._request; // eslint-disable-line no-underscore-dangle
    this._handler = exports.requestHandler;
  };

  Model.prototype.getBaseUrl = function getBaseUrl() {
    return `${this._parasut.getBaseUrl()}/${modelPath || modelName}`;
  };

  Model.prototype.getRequestOptions = function getRequestOptions() {
    return {
      auth: {
        bearer: this._parasut.getAccessToken()
      }
    };
  };

  Model.prototype.list = function list(cb) {
    const opts = _.clone(this.getRequestOptions());
    opts.url = this.getBaseUrl();
    this._request(opts, this._handler(cb));
  };
  Model.prototype.find = function find(id, cb) {
    const opts = _.clone(this.getRequestOptions());
    opts.url = `${this.getBaseUrl()}/${id}`;
    this._request(opts, this._handler(cb));
  };
  Model.prototype.add = function add(item, cb) {
    const opts = _.clone(this.getRequestOptions());
    opts.url = this.getBaseUrl();
    opts.method = 'POST';
    opts.data = item;
    this._request(opts, this._handler(cb));
  };
  Model.prototype.update = function update(id, item, cb) {
    const opts = _.clone(this.getRequestOptions());
    opts.url = `${this.getBaseUrl()}/${id}`;
    opts.method = 'PUT';
    opts.data = item;
    this._request(opts, this._handler(cb));
  };
  Model.prototype.remove = function remove(id, cb) {
    const opts = _.clone(this.getRequestOptions());
    opts.url = `${this.getBaseUrl()}/${id}`;
    opts.method = 'DELETE';
    this._request(opts, this._handler(cb));
  };

  if (modelName === 'contacts') {
    require('./contacts').addPaymentMethods(Model);
  }

  Object.defineProperty(Model, 'name', { value: modelName });

  Parasut.prototype[modelName] = new Model(); // eslint-disable-line no-param-reassign
};
