import { Router } from 'express';

const router = Router();

let blogPosts = [];
let nextId = 1;

function findPost(id) {
  return blogPosts.find((post) => post.id === Number(id));
}

function validatePost(body, partial = false) {
  const errors = [];

  if (!partial || body.title !== undefined) {
    if (typeof body.title !== 'string' || !body.title.trim()) {
      errors.push('title must be a non-empty string');
    }
  }

  if (!partial || body.body !== undefined) {
    if (typeof body.body !== 'string' || !body.body.trim()) {
      errors.push('body must be a non-empty string');
    }
  }

  if (body.author !== undefined && typeof body.author !== 'string') {
    errors.push('author must be a string');
  }

  return errors;
}

router.get('/', (req, res) => {
  res.json(blogPosts);
});

router.get('/:id', (req, res) => {
  const post = findPost(req.params.id);
  if (!post) return res.status(404).json({ error: 'Post not found.' });
  res.json(post);
});

router.post('/', (req, res) => {
  const errors = validatePost(req.body);

  if (errors.length) {
    return res.status(400).json({ error: 'Invalid post data.', details: errors });
  }

  const post = {
    id: nextId++,
    title: req.body.title.trim(),
    body: req.body.body.trim(),
    author: typeof req.body.author === 'string' && req.body.author.trim()
      ? req.body.author.trim()
      : 'Anonymous',
    createdAt: new Date().toISOString()
  };

  blogPosts.push(post);
  res.status(201).json(post);
});

router.put('/:id', (req, res) => {
  const post = findPost(req.params.id);
  if (!post) return res.status(404).json({ error: 'Post not found.' });

  const errors = validatePost(req.body, true);
  if (errors.length) {
    return res.status(400).json({ error: 'Invalid post data.', details: errors });
  }

  if (req.body.title !== undefined) post.title = req.body.title.trim();
  if (req.body.body !== undefined) post.body = req.body.body.trim();
  if (req.body.author !== undefined) post.author = req.body.author.trim();

  res.json(post);
});

router.delete('/:id', (req, res) => {
  const index = blogPosts.findIndex((post) => post.id === Number(req.params.id));
  if (index === -1) return res.status(404).json({ error: 'Post not found.' });

  const [removedPost] = blogPosts.splice(index, 1);
  res.json({ message: 'Post deleted.', post: removedPost });
});

export default router;
