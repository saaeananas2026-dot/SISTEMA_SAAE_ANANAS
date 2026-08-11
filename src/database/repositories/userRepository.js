import { v4 as uuidv4 } from 'uuid';
import { saveDatabase } from '../init.js';

export class UserRepository {
  constructor(db) { this.db = db; }

  _getOne(sql, params = []) {
    const stmt = this.db.prepare(sql);
    stmt.bind(params);
    if (stmt.step()) {
      const cols = stmt.getColumnNames();
      const vals = stmt.get();
      stmt.free();
      const row = {};
      cols.forEach((c, i) => row[c] = vals[i]);
      return row;
    }
    stmt.free();
    return null;
  }

  _getAll(sql, params = []) {
    const result = this.db.exec(sql, params);
    if (result.length === 0) return [];
    const cols = result[0].columns;
    return result[0].values.map(vals => {
      const row = {};
      cols.forEach((c, i) => row[c] = vals[i]);
      return row;
    });
  }

  findByMatricula(matricula) {
    return this._getOne('SELECT * FROM users WHERE matricula = ? AND ativo = 1', [matricula]);
  }

  findById(id) {
    return this._getOne(
      'SELECT id, nome, matricula, email, cargo, ativo, ultimo_login, created_at FROM users WHERE id = ?', [id]
    );
  }

  create({ nome, matricula, email, senhaHash, cargo = 'operador' }) {
    const id = uuidv4();
    this.db.run(
      `INSERT INTO users (id, nome, matricula, email, senha_hash, cargo) VALUES (?, ?, ?, ?, ?, ?)`,
      [id, nome, matricula, email, senhaHash, cargo]
    );
    saveDatabase();
    return this.findById(id);
  }

  updateLastLogin(id) {
    this.db.run("UPDATE users SET ultimo_login = datetime('now','localtime') WHERE id = ?", [id]);
    saveDatabase();
  }

  updatePassword(id, newHash) {
    this.db.run("UPDATE users SET senha_hash = ?, updated_at = datetime('now','localtime') WHERE id = ?", [newHash, id]);
    saveDatabase();
  }

  listAll() {
    return this._getAll('SELECT id, nome, matricula, email, cargo, ativo, ultimo_login, created_at FROM users ORDER BY nome');
  }

  deactivate(id) {
    this.db.run("UPDATE users SET ativo = 0, updated_at = datetime('now','localtime') WHERE id = ?", [id]);
    saveDatabase();
  }

  activate(id) {
    this.db.run("UPDATE users SET ativo = 1, updated_at = datetime('now','localtime') WHERE id = ?", [id]);
    saveDatabase();
  }
}
