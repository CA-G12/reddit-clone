/* eslint-disable no-undef */
const supertest = require('supertest');

const app = require('../app');
const build = require('../database/config/build');
const buildFakeData = require('../database/config/buildFakeData');
const connection = require('../database/config/connection');

beforeAll(() => {
  build();
  buildFakeData();
});
afterAll(() => connection.end());

describe('Dummy tests for ci github actions.', () => {
  it('Testing the body object contains the isLoggedIn key.', (done) => {
    supertest(app)
      .get('/api/v1/posts')
      .expect(200)
      .end((err, res) => {
        if (err) return done(err);
        expect(typeof res.body.isLoggedIn).toBe('boolean');
        return done();
      });
  });

  it('Testing the body object contains the isLoggedIn key.', (done) => {
    supertest(app)
      .get('/api/v1/posts')
      .expect(200)
      .end((err, res) => {
        if (err) return done(err);
        expect(res.body.rows).toBeDefined();
        return done();
      });
  });
});
