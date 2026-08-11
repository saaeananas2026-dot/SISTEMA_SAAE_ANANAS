import mongoose from 'mongoose';
import { runMigrations } from './migrations.js';

let isConnected = false;

export async function initDatabase() {
  const MONGO_URI = 'mongodb+srv://saaeananas2026_db_user:jeGwNwaRSwldM3Lz@cluster0.vvibnrk.mongodb.net/saae_erp?appName=Cluster0';
  
  if (isConnected) {
    console.log('[Database] Already connected to MongoDB');
    return mongoose.connection;
  }

  console.log(`[Database] Connecting to MongoDB...`);
  
  try {
    await mongoose.connect(MONGO_URI, {
      serverSelectionTimeoutMS: 5000,
    });
    
    isConnected = true;
    console.log('[Database] Connected to MongoDB successfully');
    
    // Roda migrations (como criar usuário padrão caso a coleção esteja vazia)
    await runMigrations();
    
    return mongoose.connection;
  } catch (error) {
    console.error('[Database] MongoDB connection error:', error);
    throw error;
  }
}

export function saveDatabase() {
  // No-op for MongoDB (auto-saves on model operations)
}

export function getDatabase() {
  return mongoose.connection;
}

export function closeDatabase() {
  if (isConnected) {
    mongoose.connection.close();
    isConnected = false;
    console.log('[Database] Closed MongoDB connection');
  }
}
