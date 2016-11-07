var OAuth2 = require('oauth').OAuth2;

var getToken = function (parasut, isAccessToken, cb) {
  var self = parasut;
  var authorizePath = '/oauth/authorize';
  var accessTokenPath = '/oauth/token';
  var baseUrl = 'https://api.parasut.com';

  if (!self._oauth2) {
    self._oauth2 = new OAuth2(self._clientId, self._clientSecret,
      baseUrl, authorizePath, accessTokenPath);
  }
  self._oauth2.getOAuthAccessToken(
    '',
    {
      'grant_type': isAccessToken ? 'client_credentials' : 'refresh_token'
    },
    function (error, access_token, refresh_token, results) {
      if (!error) {
        self._accessToken = access_token;
        self._refreshToken = refresh_token;
      }
      if (cb) {
        cb(error, access_token, refresh_token, results);
      }
    });
};

exports = module.exports = function (Parasut) {
  Parasut.prototype.authorize = function (cb) {
    getToken(this, true, cb);
  };
  Parasut.prototype.getAccessToken = function () {
    return this._accessToken;
  };

  Parasut.prototype.refreshToken = function (cb) {
    getToken(this, false, cb);
  };
  Parasut.prototype.getRefreshToken = function (cb) {
    return this._refreshToken;
  };

};
