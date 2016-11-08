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

describe('Get AccessToken', () => {
  it('should work', (done) => {
    parasut.authorize((err, accessToken, refreshToken, results) => {
      expect(err).not.to.be.exist();
      expect(accessToken).to.be.exist();
      expect(refreshToken).to.be.exist();
      expect(results).to.be.exist();
      done();
    });
  });
});

describe('Get Refresh Token', () => {
  it('should work', (done) => {
    parasut.authorize((err) => {
      expect(err).not.to.be.exist();
      parasut.refreshToken((refreshError, accessToken, refreshToken, results) => {
        expect(refreshError).not.to.be.exist();
        expect(accessToken).to.be.exist();
        expect(refreshToken).to.be.exist();
        expect(results).to.be.exist();
        done();
      });
    });
  });
});
