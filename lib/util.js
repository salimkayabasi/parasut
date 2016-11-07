var _ = require('lodash');

exports.requestHandler = function (callback) {
  return function (err, res, body) {
    if (err) {
      callback(err);
      return;
    }
    if (!_.isObject(body) && res.statusCode >= 400) {
      var msg = _.isEmpty(body) ? res.statusMessage : body;
      err = new Error(msg);
      err.status = res.status;
      callback(err);
      return;
    }
    callback(err, body);
  }
};

exports.setModel = function (Parasut, parasut, modelPath, modelName) {
  modelName = modelName || modelPath;
  var model = function () {
    this._parasut = parasut;
    this._request = parasut._request;
    this._handler = exports.requestHandler;
  };

  model.prototype.getBaseUrl = function () {
    return this._parasut.getBaseUrl() + '/' + modelPath;
  };

  model.prototype.getRequestOptions = function () {
    return {
      auth: {
        bearer: this._parasut.getAccessToken()
      }
    }
  };

  model.prototype.list = function (cb) {
    var opts = _.clone(this.getRequestOptions());
    opts.url = this.getBaseUrl();
    this._request(opts, this._handler(cb));
  };
  model.prototype.find = function (id, cb) {
    var opts = _.clone(this.getRequestOptions());
    opts.url = this.getBaseUrl() + '/' + id;
    this._request(opts, this._handler(cb));
  };
  model.prototype.add = function (model, cb) {
    var opts = _.clone(this.getRequestOptions());
    opts.url = this.getBaseUrl();
    opts.method = 'POST';
    opts.data = model;
    this._request(opts, this._handler(cb));
  };
  model.prototype.update = function (cb) {
    var opts = _.clone(this.getRequestOptions());
    opts.url = this.getBaseUrl() + '/' + id;
    opts.method = 'PUT';
    opts.data = model;
    this._request(opts, this._handler(cb));
  };
  model.prototype.remove = function (cb) {
    var opts = _.clone(this.getRequestOptions());
    opts.url = this.getBaseUrl() + '/' + id;
    opts.method = 'DELETE';
    this._request(opts, this._handler(cb));
  };

  Object.defineProperty(model, 'name', { value: modelName });

  Parasut.prototype[modelName] = new model();
};
