import express from 'express';
import postsRouter from './routes/posts.js';

const app = express();
const PORT = process.env.PORT || 5000;

// Parse JSON before the routes try to read req.body.
app.use(express.json());

app.get('/', (req, res) => {
  res.json({
    message: 'Data Hub API is running',
    endpoints: { posts: '/posts', singlePost: '/posts/:id' }
  });
});

app.use('/posts', postsRouter);

// Return a useful response for malformed JSON instead of a stack trace.
app.use((err, req, res, next) => {
  if (err instanceof SyntaxError && 'body' in err) {
    return res.status(400).json({ error: 'Request body must be valid JSON.' });
  }
  console.error(err);
  res.status(500).json({ error: 'Something went wrong on the server.' });
});

app.listen(PORT, () => {
  console.log(`Data Hub API listening on port ${PORT}`);
});

export default app;
