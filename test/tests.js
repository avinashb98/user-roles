/* eslint-disable */
process.env.NODE_ENV = 'test';
require('dotenv').config();
const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../app');
const should = chai.should();

const User = require('../src/models/user');
const Role = require('../src/models/role');

chai.use(chaiHttp);

describe('User Roles APIs Testing', () => {
  describe('Testing for welcome message', () => {
    it('it should GET a welcome message', (done) => {
      chai.request(server)
        .get('/api')
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a('object');
          res.body.message.should.eql('Welcome to User-Roles API');
          done();
        });
    });
  });

  describe('Testing for Registering User', () => {
    it('it registers a new user', (done) => {
      chai.request(server)
        .post('/api/user')
        .send({
          userId: 'avinashb98'
        })
        .end((err, res) => {
          res.should.have.status(201);
          res.body.should.be.a('object');
          res.body.message.should.eql('User Successfully Created');
          done();
        });
    });
    after(async () => {
      await User.destroy({ where: { userId: 'avinashb98' }});
    })
  });

  describe('Testing for Creating Role', () => {
    it('it creates a new role', (done) => {
      chai.request(server)
        .post('/api/role')
        .send({
          role: 'xyz'
        })
        .end((err, res) => {
          res.should.have.status(201);
          res.body.should.be.a('object');
          res.body.message.should.eql('Role Successfully Created');
          done();
        });
    });
    after(async () => {
      await Role.destroy({ where: { role: 'xyz' }});
    })
  });

});