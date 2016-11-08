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
    try {
      const result = JSON.parse(body);
      callback(null, result);
    } catch (castError) {
      callback(castError, body);
    }
  };

exports.makeGetRequest = (self, path, id, cb) => {
  const opts = _.clone(self.getRequestOptions());
  opts.url = `${self.getBaseUrl()}/${id}/${path}`;
  if (self._parasut.validateToken()) {
    self._request(opts, self._handler(cb));
  } else {
    self._parasut.refreshToken((err) => {
      if (err) {
        cb(err);
        return;
      }
      opts.auth = _.clone(self.getRequestOptions()).auth;
      self._request(opts, self._handler(cb));
    });
  }
};
exports.makePostRequest = (self, path, id, item, cb) => {
  const opts = _.clone(self.getRequestOptions());
  opts.url = `${self.getBaseUrl()}/${id}/${path}`;
  opts.method = 'POST';
  opts.data = item;
  if (self._parasut.validateToken()) {
    self._request(opts, self._handler(cb));
  } else {
    self._parasut.refreshToken((err) => {
      if (err) {
        cb(err);
        return;
      }
      opts.auth = _.clone(self.getRequestOptions()).auth;
      self._request(opts, self._handler(cb));
    });
  }
};

exports.setModel = (Parasut, parasut, modelName, modelPath) => {
  const Model = function Model() {
    this._parasut = parasut;
    this._request = parasut._request;
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
    const self = this;
    const opts = _.clone(self.getRequestOptions());
    opts.url = self.getBaseUrl();
    if (parasut.validateToken()) {
      self._request(opts, self._handler(cb));
    } else {
      parasut.refreshToken((err) => {
        if (err) {
          cb(err);
          return;
        }
        opts.auth = _.clone(self.getRequestOptions()).auth;
        self._request(opts, self._handler(cb));
      });
    }
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

  if (['contacts', 'accounts', 'invoices']
      .indexOf(modelName) !== -1) {
    // eslint-disable-next-line  import/no-dynamic-require
    require(`./${modelName}`)(Model);
  }

  Object.defineProperty(Model, 'name', { value: modelName });

  Parasut.prototype[modelName] = new Model(); // eslint-disable-line no-param-reassign
};
