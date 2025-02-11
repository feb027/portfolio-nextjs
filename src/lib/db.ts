import Database from 'better-sqlite3';
import path from 'path';

// Initialize database
const db = new Database(path.join(process.cwd(), 'comments.db'));

// Create tables if they don't exist
db.exec(`
  CREATE TABLE IF NOT EXISTS comments (
    id TEXT PRIMARY KEY,
    content TEXT NOT NULL,
    articleId TEXT NOT NULL,
    authorName TEXT NOT NULL,
    parentId TEXT,
    createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
    userId TEXT,
    FOREIGN KEY (parentId) REFERENCES comments(id) ON DELETE CASCADE
  );

  CREATE INDEX IF NOT EXISTS idx_comments_articleId ON comments(articleId);
  CREATE INDEX IF NOT EXISTS idx_comments_parentId ON comments(parentId);
`);

export { db }; 