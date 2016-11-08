const chai = require('chai');
const dirtyChai = require('dirty-chai');

chai.use(dirtyChai);
const expect = chai.expect;

const Parasut = require('../');

const id = process.env.clientId;
const secret = process.env.clientSecret;
const firmNo = process.env.firmNo;

const parasut = new Parasut(id, secret, firmNo);

describe('Get Contacts', () => {
  before((done) => {
    parasut.authorize(done);
  });
  it('should work', (done) => {
    parasut.contacts.list((error, body) => {
      expect(error).not.to.be.exist();
      expect(body).to.be.exist();
      done();
    });
  });
});
