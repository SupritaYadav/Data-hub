import test from 'node:test';
import assert from 'node:assert/strict';
import express from 'express';
import postsRouter from '../routes/posts.js';

test('GET /posts responds with a JSON array', async () => {
  const app = express();
  app.use(express.json());
  app.use('/posts', postsRouter);

  const server = app.listen(0);
  await new Promise((resolve) => server.once('listening', resolve));

  try {
    const response = await fetch(`http://127.0.0.1:${server.address().port}/posts`);
    assert.equal(response.status, 200);
    assert.ok(Array.isArray(await response.json()));
  } finally {
    await new Promise((resolve) => server.close(resolve));
  }
});
