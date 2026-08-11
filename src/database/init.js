import initSqlJs from 'sql.js';
import path from 'path';
import fs from 'fs';
import { app } from 'electron';
import { runMigrations } from './migrations.js';

let db = null;
let dbPath = '';

export async function initDatabase() {
  dbPath = path.join(app.getPath('userData'), 'saae.db');
  console.log(`[Database] Initializing at: ${dbPath}`);
  
  const SQL = await initSqlJs();
  
  if (fs.existsSync(dbPath)) {
    const fileBuffer = fs.readFileSync(dbPath);
    db = new SQL.Database(fileBuffer);
    console.log('[Database] Loaded existing database');
  } else {
    db = new SQL.Database();
    console.log('[Database] Created new database');
  }
  
  db.run('PRAGMA foreign_keys = ON');
  runMigrations(db);
  saveDatabase();
  
  console.log('[Database] Initialized successfully');
  return db;
}

export function saveDatabase() {
  if (db && dbPath) {
    const data = db.export();
    const buffer = Buffer.from(data);
    fs.writeFileSync(dbPath, buffer);
  }
}

export function getDatabase() {
  return db;
}

export function closeDatabase() {
  if (db) {
    saveDatabase();
    db.close();
    db = null;
    console.log('[Database] Closed');
  }
}
