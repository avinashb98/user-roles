/* eslint-disable */
process.env.NODE_ENV = 'test';
require('dotenv').config();
const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../app');
const should = chai.should();

const User = require('../src/models/user');
const Role = require('../src/models/role');
const UserRole = require('../src/models/userRole');

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
          userId: 'test'
        })
        .end((err, res) => {
          res.should.have.status(201);
          res.body.should.be.a('object');
          res.body.message.should.eql('User Successfully Created');
          done();
        });
    });
    after(async () => {
      await User.destroy({ where: { userId: 'test' }});
    })
  });

  describe('Testing for Creating Role', () => {
    it('it creates a new role', (done) => {
      chai.request(server)
        .post('/api/role')
        .send({
          role: 'test'
        })
        .end((err, res) => {
          res.should.have.status(201);
          res.body.should.be.a('object');
          res.body.message.should.eql('Role Successfully Created');
          done();
        });
    });
    after(async () => {
      await Role.destroy({ where: { role: 'test' }});
    })
  });

  describe('Testing for Assigning User Role (Single)', () => {
    before(async () => {
      await Promise.all([
        User.create({ userId: 'test' }),
        Role.create({ role: 'test' })
      ]);
    });

    it('it assigns user a new role', (done) => {
      chai.request(server)
        .post('/api/user-role/assign')
        .send({
          role: 'test',
          userId: 'test'
        })
        .end((err, res) => {
          res.should.have.status(201);
          res.body.should.be.a('object');
          res.body.message.should.be.a('string');
          done();
        });
    });
    after(async () => {
      await Promise.all([
        Role.destroy({ where: { role: 'test' } }),
        User.destroy({ where: { userId: 'test' } }),
        UserRole.destroy({ where: { userId: 'test', role: 'test' } })
      ]);
    })
  });

  describe('Testing for Assigning User Role (Multiple)', () => {
    before(async () => {
      await Promise.all([
        User.create({ userId: 'test' }),
        Role.create({ role: 'test' }),
        Role.create({ role: 'test2' })
      ]);
    });

    it('it assigns user new roles', (done) => {
      chai.request(server)
        .post('/api/user-role/assign')
        .send({
          role: ['test', 'test2'],
          userId: 'test'
        })
        .end((err, res) => {
          res.should.have.status(201);
          res.body.should.be.a('object');
          res.body.message.should.be.a('string');
          done();
        });
    });
    after(async () => {
      await Promise.all([
        Role.destroy({ where: { role: 'test' } }),
        Role.destroy({ where: { role: 'test2' } }),
        User.destroy({ where: { userId: 'test' } }),
        UserRole.destroy({ where: { userId: 'test', role: 'test' } }),
        UserRole.destroy({ where: { userId: 'test', role: 'test2' } })
      ]);
    })
  });

  describe('Testing for Getting Users by Role', () => {
    before(async () => {
      await Promise.all([
        User.create({ userId: 'test' }),
        User.create({ userId: 'test2' }),
        Role.create({ role: 'test' }),
        UserRole.create({ userId: 'test', role: 'test' }),
        UserRole.create({ userId: 'test2', role: 'test' })
      ]);
    });

    it('it gets users by role', (done) => {
      chai.request(server)
        .get('/api/user-role/users-by-role')
        .send({
          role: 'test'
        })
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a('object');
          res.body.message.should.be.a('string');
          done();
        });
    });
    after(async () => {
      await Promise.all([
        Role.destroy({ where: { role: 'test' } }),
        User.destroy({ where: { userId: 'test' } }),
        User.destroy({ where: { userId: 'test2' } }),
        UserRole.destroy({ where: { userId: 'test', role: 'test' } }),
        UserRole.create({ where: { userId: 'test2', role: 'test' } })
      ]);
    })
  });
});
