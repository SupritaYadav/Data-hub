# Postman / Thunder Client checklist

Base URL: `http://localhost:5000`

- [ ] `GET /` — server status
- [ ] `GET /posts` — initially returns an array
- [ ] `POST /posts` — create a post with `title`, `body`, and optional `author`
- [ ] `GET /posts` — check that the post appears
- [ ] `GET /posts/1` — get the post (use the actual returned ID)
- [ ] `PUT /posts/1` — update its title or body
- [ ] `DELETE /posts/1` — delete it
- [ ] `GET /posts/1` — confirm it now returns `404`
- [ ] `POST /posts` with an empty title — confirm `400`
- [ ] Send malformed JSON — confirm `400`

