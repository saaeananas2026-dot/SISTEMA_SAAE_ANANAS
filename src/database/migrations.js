import bcrypt from 'bcryptjs';
import { User } from './models/User.js';

export async function runMigrations() {
  await createDefaultAdmin();
}

async function createDefaultAdmin() {
  try {
    const count = await User.countDocuments();
    if (count === 0) {
      const senhaHash = bcrypt.hashSync('saae2024', 10);
      await User.create({
        nome: 'Administrador',
        matricula: 'admin',
        email: 'admin@saae.gov.br',
        senha_hash: senhaHash,
        cargo: 'admin'
      });
      console.log('[Migration] Default admin created (matricula: admin, senha: saae2024)');
    }
  } catch (error) {
    console.error('[Migration] Failed to create default admin:', error);
  }
}
