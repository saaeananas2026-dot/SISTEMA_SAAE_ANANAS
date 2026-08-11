import { User } from '../models/User.js';

export class UserRepository {
  constructor(db) { 
    this.db = db; // Keeping for compatibility, though we'll use Mongoose directly
  }

  async findByMatricula(matricula) {
    const user = await User.findOne({ matricula, ativo: 1 }).lean();
    return user;
  }

  async findById(id) {
    const user = await User.findOne({ _id: id }).select('-senha_hash').lean();
    if (user) {
      user.id = user._id;
    }
    return user;
  }

  async create({ nome, matricula, email, senhaHash, cargo = 'operador' }) {
    const newUser = await User.create({
      nome,
      matricula,
      email,
      senha_hash: senhaHash,
      cargo
    });
    return this.findById(newUser._id);
  }

  async updateLastLogin(id) {
    await User.updateOne({ _id: id }, { ultimo_login: new Date() });
  }

  async updatePassword(id, newHash) {
    await User.updateOne({ _id: id }, { senha_hash: newHash, updated_at: new Date() });
  }

  async listAll() {
    const users = await User.find().select('-senha_hash').sort({ nome: 1 }).lean();
    return users.map(u => {
      u.id = u._id;
      return u;
    });
  }

  async deactivate(id) {
    await User.updateOne({ _id: id }, { ativo: 0, updated_at: new Date() });
  }

  async activate(id) {
    await User.updateOne({ _id: id }, { ativo: 1, updated_at: new Date() });
  }
}
