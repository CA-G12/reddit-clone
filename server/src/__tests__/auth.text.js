/* eslint-disable no-undef */
const supertest = require('supertest');

const app = require('../app');
const build = require('../database/config/build');
const buildFakeData = require('../database/config/buildFakeData');
const connection = require('../database/config/connection');

beforeAll(() => {
  build().then(buildFakeData);
});
afterAll(() => connection.end());

describe('Testing auth paths', () => {
  it('dummy test', () => {
    expect(1 + 1).toBe(2);
  });
  it('Should return the username if the password is correct', (done) => {
    supertest(app)
      .post('/api/v1/auth/login')
      .send({ username: 'mohammed', password: 'Root!123' })
      .end((err, res) => {
        if (err) return done(err);
        expect(res.status).toBe(200);
        return done();
      });
  });

  it('Testing signup route', (done) => {
    supertest(app)
      .post('/api/v1/auth/signup')
      .send({
        username: 'Khalil',
        password: 'Hii@111',
        email: 'hi1@hi2.com',
        fname: 'Mohammed',
        lname: 'Rami',
        phone: '0599000000',
      })
      .end((err, res) => {
        if (err) return done(err);
        expect(res.statusCode).toBe(201);
        return done();
      });
  });

  test('Testing logout endpoint', (done) => {
    supertest(app)
      .get('/api/v1/auth/logout')
      .expect(302)
      .end((err, res) => {
        if (err) return done(err);
        expect(res.headers['content-type']).toContain('json');
        return done();
      });
  });

  test('Testing logout endpoint', (done) => {
    supertest(app)
      .get('/api/v1/auth/logout')
      .expect(302)
      .end((err, res) => {
        if (err) return done(err);
        expect(res.body.msg).toBeDefined();
        return done();
      });
  });
});
