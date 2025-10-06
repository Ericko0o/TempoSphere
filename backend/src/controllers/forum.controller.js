// backend/src/controllers/forum.controller.js
import pool from "../../config/db.js";

export const listThreads = async (req, res) => {
  try {
    const { rows } = await pool.query("SELECT id, title, created_by, created_at FROM forum_threads ORDER BY created_at DESC LIMIT 50");
    res.json(rows);
  } catch (err) { console.error(err); res.status(500).json({ error: err.message }); }
};

export const createThread = async (req, res) => {
  try {
    const { title, created_by } = req.body;
    if (!title) return res.status(400).json({ error: "title required" });
    const { rows } = await pool.query("INSERT INTO forum_threads (title, created_by) VALUES ($1,$2) RETURNING *", [title, created_by || null]);
    res.status(201).json(rows[0]);
  } catch (err) { console.error(err); res.status(500).json({ error: err.message }); }
};

export const listPostsByThread = async (req, res) => {
  try {
    const threadId = req.params.id;
    const { rows } = await pool.query("SELECT id, author, content, lat, lon, location_name, created_at FROM forum_posts WHERE thread_id=$1 ORDER BY created_at ASC", [threadId]);
    res.json(rows);
  } catch (err) { console.error(err); res.status(500).json({ error: err.message }); }
};

export const createPost = async (req, res) => {
  try {
    const threadId = req.params.id;
    const { author, content, lat, lon, location_name } = req.body;
    if (!content) return res.status(400).json({ error: "content required" });
    const { rows } = await pool.query(
      "INSERT INTO forum_posts (thread_id, author, content, lat, lon, location_name) VALUES ($1,$2,$3,$4,$5,$6) RETURNING *",
      [threadId, author || null, content, lat || null, lon || null, location_name || null]
    );
    res.status(201).json(rows[0]);
  } catch (err) { console.error(err); res.status(500).json({ error: err.message }); }
};
