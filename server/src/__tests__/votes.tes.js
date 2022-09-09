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

describe('Testing votes endpoints', () => {
  it('Testing votes controller', (done) => {
    supertest(app)
      .patch('/api/v1/posts/votes')
      .expect(200)
      .send({
        id: 1,
      })
      .end((err, res) => {
        if (err) return done(err);
        expect(res.body instanceof Object).toBe(true);
        return done();
      });
  });
});
