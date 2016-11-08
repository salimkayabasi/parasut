const OAuth2 = require('oauth').OAuth2;

const tokenize = (parasut, isAccessToken, cb) => {
  const self = parasut;
  const authorizePath = '/oauth/authorize';
  const accessTokenPath = '/oauth/token';
  const baseUrl = 'https://api.parasut.com';

  /* eslint-disable no-underscore-dangle */
  if (!self._oauth2) {
    self._oauth2 = new OAuth2(self._clientId, self._clientSecret,
      baseUrl, authorizePath, accessTokenPath);
  }
  self._oauth2.getOAuthAccessToken(
    '',
    {
      grant_type: isAccessToken ? 'client_credentials' : 'refresh_token'
    },
    (error, accessToken, refreshToken, results) => {
      if (!error) {
        self._accessToken = accessToken;
        self._refreshToken = refreshToken;
      }
      if (cb) {
        cb(error, accessToken, refreshToken, results);
      }
    });
  /* eslint-enable no-underscore-dangle */
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
  Parasut.prototype.getRefreshToken = function getRefreshToken() {
    return this._refreshToken;
  };
  /* eslint-enable no-param-reassign */
};
