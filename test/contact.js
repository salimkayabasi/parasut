const chai = require('chai');
const dirtyChai = require('dirty-chai');

chai.use(dirtyChai);
const expect = chai.expect;

const Parasut = require('../');

const id = process.env.clientId;
const secret = process.env.clientSecret;
const firmNo = process.env.firmNo;
const email = process.env.email;
const password = process.env.password;

const parasut = new Parasut(id, secret, firmNo, email, password);

describe('Get Contacts', () => {
  before((done) => {
    parasut.authorize(done);
  });
  it('should work', (done) => {
    parasut.contacts.list((error, body) => {
      expect(error).not.to.be.exist();
      expect(body).to.be.exist();
      expect(body.items).to.be.exist();
      expect(body.meta).to.be.exist();
      done();
    });
  });
});
