var chai = require('chai');
var dirtyChai = require('dirty-chai');
chai.use(dirtyChai);
var expect = chai.expect;

var Parasut = require('../');

var id = process.env.clientId;
var secret = process.env.clientSecret;
var firmNo = process.env.firmNo;

describe('Get AccessToken', function () {
  it('should work', function (done) {
    var parasut = new Parasut(id, secret, firmNo);
    parasut.authorize(function (err, access_token, refresh_token, results) {
      expect(err).not.to.be.exist();
      expect(access_token).to.be.exist();
      expect(refresh_token).not.to.be.exist();
      expect(results).to.be.exist();
      done();
    });
  });
});
