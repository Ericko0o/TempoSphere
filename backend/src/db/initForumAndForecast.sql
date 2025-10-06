-- backend/src/db/initForumAndForecast.sql
CREATE TABLE IF NOT EXISTS forum_threads (
  id SERIAL PRIMARY KEY,
  title TEXT NOT NULL,
  created_by TEXT,
  created_at TIMESTAMP DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS forum_posts (
  id SERIAL PRIMARY KEY,
  thread_id INTEGER REFERENCES forum_threads(id) ON DELETE CASCADE,
  author TEXT,
  content TEXT,
  lat DOUBLE PRECISION,
  lon DOUBLE PRECISION,
  location_name TEXT,
  created_at TIMESTAMP DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS cached_predictions (
  id SERIAL PRIMARY KEY,
  lat DOUBLE PRECISION,
  lon DOUBLE PRECISION,
  gas VARCHAR(32),
  pred_for DATE,
  value DOUBLE PRECISION,
  source VARCHAR(128),
  retrieved_at TIMESTAMP DEFAULT NOW()
);
