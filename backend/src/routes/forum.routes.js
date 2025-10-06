// backend/src/routes/forum.routes.js
import express from "express";
import { createThread, listThreads, createPost, listPostsByThread } from "../controllers/forum.controller.js";
const router = express.Router();

router.get("/threads", listThreads);         // GET /api/forum/threads
router.post("/threads", createThread);       // POST /api/forum/threads { title, created_by }
router.get("/threads/:id/posts", listPostsByThread); // GET /api/forum/threads/:id/posts
router.post("/threads/:id/posts", createPost); // POST /api/forum/threads/:id/posts { author, content, lat, lon, location_name }

export default router;
