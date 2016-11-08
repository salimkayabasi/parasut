const _ = require('lodash');
const OAuth2 = require('oauth').OAuth2;

const tokenize = (parasut, isAccessToken, cb) => {
  const self = parasut;
  const authorizePath = '/oauth/authorize';
  const accessTokenPath = '/oauth/token';
  const baseUrl = 'https://api.parasut.com';
  const param = isAccessToken
    ? {
      grant_type: 'password',
      username: self._email,
      password: self._password
    }
    : {
      grant_type: 'refresh_token'
    };
  if (!self._oauth2) {
    self._oauth2 = new OAuth2(self._clientId, self._clientSecret,
      baseUrl, authorizePath, accessTokenPath);
  }
  self._oauth2.getOAuthAccessToken(self._refreshToken, param,
    (error, accessToken, refreshToken, results) => {
      if (!error) {
        self._accessToken = accessToken;
        self._refreshToken = refreshToken;
        self._tokenResult = results;
      }
      if (cb) {
        cb(error, accessToken, refreshToken, results);
      }
    });
};
exports = module.exports = (Parasut) => {
  /* eslint-disable no-param-reassign */
  Parasut.prototype.authorize = function getToken(cb) {
    tokenize(this, true, cb);
  };
  Parasut.prototype.getAccessToken = function getAccessToken() {
    return this._accessToken;
  };
  Parasut.prototype.refreshToken = function refreshToken(cb) {
    tokenize(this, false, cb);
  };
  Parasut.prototype.validateToken = function validateToken() {
    return (
      !_.isEmpty(this._accessToken) &&
      !_.isEmpty(this._refreshToken) &&
      !_.isEmpty(this._tokenResult) &&
      _.isNumber(this._tokenResult.created_at) &&
      _.isNumber(this._tokenResult.expires_in) &&
      (new Date()).getTime() > (this._tokenResult.created_at + this._tokenResult.expires_in)
    );
  };
  /* eslint-enable no-param-reassign */
};
