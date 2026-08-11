import bcrypt from 'bcryptjs';
import { v4 as uuidv4 } from 'uuid';

const migrations = [
  {
    id: 1,
    name: 'create_initial_tables',
    sqls: [
      `CREATE TABLE IF NOT EXISTS users (
        id TEXT PRIMARY KEY, nome TEXT NOT NULL, matricula TEXT UNIQUE NOT NULL,
        email TEXT, senha_hash TEXT NOT NULL, cargo TEXT DEFAULT 'operador',
        ativo INTEGER DEFAULT 1, ultimo_login TEXT,
        created_at TEXT DEFAULT (datetime('now','localtime')),
        updated_at TEXT DEFAULT (datetime('now','localtime'))
      )`,
      `CREATE TABLE IF NOT EXISTS sync_queue (
        id INTEGER PRIMARY KEY AUTOINCREMENT, table_name TEXT NOT NULL,
        record_id TEXT NOT NULL, operation TEXT NOT NULL, payload TEXT,
        status TEXT DEFAULT 'pending', attempts INTEGER DEFAULT 0,
        max_attempts INTEGER DEFAULT 5, error_message TEXT,
        created_at TEXT DEFAULT (datetime('now','localtime')), synced_at TEXT
      )`,
      `CREATE TABLE IF NOT EXISTS config (
        key TEXT PRIMARY KEY, value TEXT,
        updated_at TEXT DEFAULT (datetime('now','localtime'))
      )`,
      `CREATE TABLE IF NOT EXISTS sessions (
        id TEXT PRIMARY KEY, user_id TEXT NOT NULL, token TEXT UNIQUE NOT NULL,
        expires_at TEXT NOT NULL,
        created_at TEXT DEFAULT (datetime('now','localtime')),
        FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
      )`,
      `CREATE TABLE IF NOT EXISTS audit_log (
        id INTEGER PRIMARY KEY AUTOINCREMENT, user_id TEXT,
        action TEXT NOT NULL, details TEXT, ip_address TEXT,
        created_at TEXT DEFAULT (datetime('now','localtime'))
      )`,
      `CREATE INDEX IF NOT EXISTS idx_users_matricula ON users(matricula)`,
      `CREATE INDEX IF NOT EXISTS idx_sync_queue_status ON sync_queue(status)`,
      `CREATE INDEX IF NOT EXISTS idx_sessions_token ON sessions(token)`,
      `CREATE INDEX IF NOT EXISTS idx_sessions_user ON sessions(user_id)`,
      `CREATE INDEX IF NOT EXISTS idx_audit_log_user ON audit_log(user_id)`
    ]
  }
];

export function runMigrations(db) {
  db.run(`CREATE TABLE IF NOT EXISTS migrations (
    id INTEGER PRIMARY KEY, name TEXT NOT NULL,
    executed_at TEXT DEFAULT (datetime('now','localtime'))
  )`);

  const executedResult = db.exec('SELECT id FROM migrations');
  const executed = executedResult.length > 0 ? executedResult[0].values.map(r => r[0]) : [];

  for (const migration of migrations) {
    if (!executed.includes(migration.id)) {
      console.log(`[Migration] Running: ${migration.name}`);
      for (const sql of migration.sqls) { db.run(sql); }
      db.run('INSERT INTO migrations (id, name) VALUES (?, ?)', [migration.id, migration.name]);
      console.log(`[Migration] Completed: ${migration.name}`);
    }
  }

  createDefaultAdmin(db);
}

function createDefaultAdmin(db) {
  const result = db.exec('SELECT COUNT(*) as count FROM users');
  const count = result.length > 0 ? result[0].values[0][0] : 0;
  if (count === 0) {
    const id = uuidv4();
    const senhaHash = bcrypt.hashSync('saae2024', 10);
    db.run(
      `INSERT INTO users (id, nome, matricula, email, senha_hash, cargo) VALUES (?, ?, ?, ?, ?, ?)`,
      [id, 'Administrador', 'admin', 'admin@saae.gov.br', senhaHash, 'admin']
    );
    console.log('[Migration] Default admin created (matricula: admin, senha: saae2024)');
  }
}
