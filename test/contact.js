var chai = require('chai');
var dirtyChai = require('dirty-chai');
chai.use(dirtyChai);
var expect = chai.expect;

var Parasut = require('../');

var id = process.env.clientId;
var secret = process.env.clientSecret;
var firmNo = process.env.firmNo;

var parasut = new Parasut(id, secret, firmNo);

describe('Get Contacts', function () {
  before(function (done) {
    parasut.authorize(done);
  });
  it('should work', function (done) {
    parasut.contacts.list(function (error, body) {
      expect(error).not.to.be.exist();
      expect(body).to.be.exist();
      done();
    });
  });
});
