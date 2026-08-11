import bcrypt from 'bcryptjs';
import { v4 as uuidv4 } from 'uuid';
import { UserRepository } from '../database/repositories/userRepository.js';
import { saveDatabase } from '../database/init.js';

export class AuthService {
  constructor(db) {
    this.db = db;
    this.userRepo = new UserRepository(db);
    this.currentUser = null;
    this.currentSession = null;
  }

  login(matricula, senha) {
    try {
      const user = this.userRepo.findByMatricula(matricula);
      if (!user) return { success: false, error: 'Usuário não encontrado ou inativo.' };

      const passwordValid = bcrypt.compareSync(senha, user.senha_hash);
      if (!passwordValid) {
        this._logAudit(null, 'LOGIN_FAILED', `Tentativa falhou: ${matricula}`);
        return { success: false, error: 'Senha incorreta.' };
      }

      this.userRepo.updateLastLogin(user.id);

      const sessionToken = uuidv4();
      const expiresAt = new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString();
      this.db.run(
        `INSERT INTO sessions (id, user_id, token, expires_at) VALUES (?, ?, ?, ?)`,
        [uuidv4(), user.id, sessionToken, expiresAt]
      );
      saveDatabase();

      this.currentUser = {
        id: user.id, nome: user.nome, matricula: user.matricula,
        email: user.email, cargo: user.cargo
      };
      this.currentSession = sessionToken;
      this._logAudit(user.id, 'LOGIN_SUCCESS', 'Login realizado');

      return { success: true, user: this.currentUser, token: sessionToken };
    } catch (error) {
      console.error('[Auth] Login error:', error);
      return { success: false, error: 'Erro interno ao processar login.' };
    }
  }

  logout() {
    if (this.currentSession) {
      this.db.run('DELETE FROM sessions WHERE token = ?', [this.currentSession]);
      saveDatabase();
      this._logAudit(this.currentUser?.id, 'LOGOUT', 'Logout realizado');
    }
    this.currentUser = null;
    this.currentSession = null;
    return { success: true };
  }

  checkSession(token) {
    if (!token) return { valid: false };
    try {
      const stmt = this.db.prepare(`
        SELECT s.user_id, s.expires_at, u.id as uid, u.nome, u.matricula, u.email, u.cargo
        FROM sessions s JOIN users u ON s.user_id = u.id
        WHERE s.token = ? AND u.ativo = 1
      `);
      stmt.bind([token]);
      if (stmt.step()) {
        const cols = stmt.getColumnNames();
        const vals = stmt.get();
        stmt.free();
        const session = {};
        cols.forEach((c, i) => session[c] = vals[i]);

        if (new Date(session.expires_at) < new Date()) {
          this.db.run('DELETE FROM sessions WHERE token = ?', [token]);
          saveDatabase();
          return { valid: false };
        }
        this.currentUser = {
          id: session.uid, nome: session.nome, matricula: session.matricula,
          email: session.email, cargo: session.cargo
        };
        this.currentSession = token;
        return { valid: true, user: this.currentUser };
      }
      stmt.free();
      return { valid: false };
    } catch (error) {
      console.error('[Auth] Session check error:', error);
      return { valid: false };
    }
  }

  getCurrentUser() { return this.currentUser; }

  _logAudit(userId, action, details) {
    try {
      this.db.run(`INSERT INTO audit_log (user_id, action, details) VALUES (?, ?, ?)`, [userId, action, details]);
      saveDatabase();
    } catch (error) { console.error('[Audit] Log error:', error); }
  }

  cleanupExpiredSessions() {
    this.db.run("DELETE FROM sessions WHERE expires_at < datetime('now')");
    saveDatabase();
  }
}
