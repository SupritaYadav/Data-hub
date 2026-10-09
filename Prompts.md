# AI Assistance Log — Sprint 09, Track B

## Session 1 — Breaking down the sprint

**Question:** Help me separate Sprint 09 Track B into Phase 1 and Phase 2 requirements.

**Notes:** Phase 1 needs an Express server, JSON parsing, and the required REST routes. Phase 2 adds array-based storage and CRUD logic.

**Verification:** I compared the endpoints with the sprint instructions and tested them locally.

## Session 2 — Express request body

**Question:** Why can `req.body` be undefined in an Express POST request?

**Notes:** JSON parsing middleware such as `express.json()` must be registered before the route handlers.

**Verification:** I sent a JSON request with the `Content-Type: application/json` header and checked the response.

## Session 3 — In-memory CRUD

**Question:** Explain how create, read, update, and delete work with a JavaScript array.

**Notes:** A record can be appended with `push`, found with `find`, updated by changing its fields, and removed with `splice` after finding its index.

**Verification:** I tried creating, reading, updating, and deleting a post, including a request for a missing ID.

