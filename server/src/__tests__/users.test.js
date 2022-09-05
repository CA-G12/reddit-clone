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

describe('Testing users queries and routes.', () => {
  it('2 * 2 equals 4', () => {
    expect(2 * 2).toBe(4);
  });

  it('Should return an array', (done) => {
    supertest(app)
      .get('/api/v1/users/autocomplete?value=muss')
      .expect(200)
      .end((err, res) => {
        if (err) return done(err);
        expect(Array.isArray(res.body)).toBe(true);
        return done();
      });
  });

  it('Should return rows which matched the username', (done) => {
    supertest(app)
      .get('/api/v1/users/autocomplete?value=muss')
      .expect(200)
      .end((err, res) => {
        if (err) return done(err);
        expect(res.body[0].email).toBe('hi3@hi.com');
        return done();
      });
  });

  it('Should return the username if the password is correct', (done) => {
    supertest(app)
      .post('/api/v1/auth/login')
      .send({ username: 'mohammed', password: 'Root!123' })
      .expect(200)
      .end((err, res) => {
        if (err) return done(err);
        expect(res.body.username).toBe('mohammed');
        return done();
      });
  });

  it('Should return an array', (done) => {
    supertest(app)
      .get('/api/v1/users/autocomplete?value=muss')
      .expect(200)
      .end((err, res) => {
        if (err) return done(err);
        expect(Array.isArray(res.body)).toBe(true);
        return done();
      });
  });

  it('Should return rows which matched the username', (done) => {
    supertest(app)
      .get('/api/v1/users/autocomplete?value=muss')
      .expect(200)
      .end((err, res) => {
        if (err) return done(err);
        expect(res.body[0].email).toBe('hi3@hi.com');
        return done();
      });
  });

  it('Should return the username if the password is correct', (done) => {
    supertest(app)
      .post('/api/v1/auth/login')
      .send({ username: 'mohammed', password: 'Root!123' })
      .expect(200)
      .end((err, res) => {
        if (err) return done(err);
        expect(res.body.username).toBe('mohammed');
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
});

// it('Testing signup route', (done) => {
//   supertest(app)
//     .post('/api/v1/auth/signup')
//     .send({
//       username: 'Khalil',
//       password: 'Hii@111',
//       email: 'hi1@hi2.com',
//       fname: 'Mohammed',
//       lname: 'Rami',
//       phone: '0599000000',
//     })
//     .end((err, res) => {
//       console.log(res.body);
//       if (err) return done(err);
//       expect(res.body.username).toBe('Khalil');
//       return done();
//     });
// });
