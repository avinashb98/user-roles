/* eslint-disable */

process.env.NODE_ENV = 'test';

const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../app');
const should = chai.should();

chai.use(chaiHttp);

describe('User Roles APIs Testing', () => {
  describe('Testing for welcome message', () => {
    it('it should GET a welcome message', (done) => {
      chai.request(server)
        .get('/api')
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a('object');
          res.body.msg.should.eql('Welcome to User-Roles API');
          done();
        });
    });
  });
});