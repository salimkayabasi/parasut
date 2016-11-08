const chai = require('chai');
const dirtyChai = require('dirty-chai');

chai.use(dirtyChai);
const expect = chai.expect;

const Parasut = require('../');

const id = process.env.clientId;
const secret = process.env.clientSecret;
const firmNo = process.env.firmNo;

const parasut = new Parasut(id, secret, firmNo);

describe('Get AccessToken', () => {
  it('should work', (done) => {
    parasut.authorize((err, accessToken, refreshToken, results) => {
      expect(err).not.to.be.exist();
      expect(accessToken).to.be.exist();
      expect(refreshToken).not.to.be.exist();
      expect(results).to.be.exist();
      done();
    });
  });
});
