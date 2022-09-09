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

describe('Testing posts queries and routes.', () => {
  it('3 * 2 equals 4', () => {
    expect(3 * 2).toBe(6);
  });

  it('Testing the body object contains the rows key.', (done) => {
    // ? To Do : refactor the test.
    supertest(app)
      .get('/api/v1/posts')
      .expect(200)
      .end((err, res) => {
        if (err) return done(err);
        expect(res.body.rows).toBeDefined();
        return done();
      });
  });

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
        expect(Array.isArray(res.body.rows)).toBe(true);
        return done();
      });
  });

  it('Testing post generator endpoint', (done) => {
    supertest(app)
      .get('/api/v1/posts/generator')
      .expect(200)
      .end((err, res) => {
        if (err) return done(err);
        expect(res.body.id).toBeFalsy();
        return done(err);
      });
  });

  it('Testing post generator endpoint', (done) => {
    supertest(app)
      .post('/api/v1/posts/new')
      .expect(200)
      .end((err, res) => {
        if (err) return done(err);
        expect(res.body.id).toBeFalsy();
        return done(err);
      });
  });

  it('Testing delete route', (done) => {
    supertest(app)
      .delete('/api/v1/posts/delete')
      .send({
        id: 2,
      })
      .end((err, res) => {
        if (err) return done(err);
        expect(res.status).toBe(200);
        return done();
      });
  });
});
