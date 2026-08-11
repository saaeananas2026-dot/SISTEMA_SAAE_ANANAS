import bcrypt from 'bcryptjs';
import { v4 as uuidv4 } from 'uuid';
import { UserRepository } from '../database/repositories/userRepository.js';
import { Session } from '../database/models/Session.js';
import { AuditLog } from '../database/models/AuditLog.js';
import { User } from '../database/models/User.js';

export class AuthService {
  constructor(db) {
    this.db = db;
    this.userRepo = new UserRepository(db);
    this.currentUser = null;
    this.currentSession = null;
  }

  async login(matricula, senha) {
    try {
      const user = await this.userRepo.findByMatricula(matricula);
      if (!user) return { success: false, error: 'Usuário não encontrado ou inativo.' };

      const passwordValid = bcrypt.compareSync(senha, user.senha_hash);
      if (!passwordValid) {
        await this._logAudit(null, 'LOGIN_FAILED', `Tentativa falhou: ${matricula}`);
        return { success: false, error: 'Senha incorreta.' };
      }

      await this.userRepo.updateLastLogin(user._id);

      const sessionToken = uuidv4();
      const expiresAt = new Date(Date.now() + 24 * 60 * 60 * 1000);
      
      await Session.create({
        user_id: user._id,
        token: sessionToken,
        expires_at: expiresAt
      });

      this.currentUser = {
        id: user._id, nome: user.nome, matricula: user.matricula,
        email: user.email, cargo: user.cargo
      };
      this.currentSession = sessionToken;
      await this._logAudit(user._id, 'LOGIN_SUCCESS', 'Login realizado');

      return { success: true, user: this.currentUser, token: sessionToken };
    } catch (error) {
      console.error('[Auth] Login error:', error);
      return { success: false, error: 'Erro interno ao processar login.' };
    }
  }

  async logout() {
    if (this.currentSession) {
      await Session.deleteOne({ token: this.currentSession });
      await this._logAudit(this.currentUser?.id, 'LOGOUT', 'Logout realizado');
    }
    this.currentUser = null;
    this.currentSession = null;
    return { success: true };
  }

  async checkSession(token) {
    if (!token) return { valid: false };
    try {
      const session = await Session.findOne({ token }).lean();
      if (!session) return { valid: false };

      if (new Date(session.expires_at) < new Date()) {
        await Session.deleteOne({ token });
        return { valid: false };
      }

      const user = await User.findOne({ _id: session.user_id, ativo: 1 }).lean();
      if (!user) return { valid: false };

      this.currentUser = {
        id: user._id, nome: user.nome, matricula: user.matricula,
        email: user.email, cargo: user.cargo
      };
      this.currentSession = token;
      return { valid: true, user: this.currentUser };
    } catch (error) {
      console.error('[Auth] Session check error:', error);
      return { valid: false };
    }
  }

  getCurrentUser() { return this.currentUser; }

  async _logAudit(userId, action, details) {
    try {
      await AuditLog.create({
        user_id: userId,
        action: action,
        details: details
      });
    } catch (error) { console.error('[Audit] Log error:', error); }
  }

  async cleanupExpiredSessions() {
    try {
      await Session.deleteMany({ expires_at: { $lt: new Date() } });
    } catch (e) {
      // Ignorar erros
    }
  }
}
