import { Server } from './server';
import { DatabaseService } from './database/DatabaseService';

const PORT = process.env.API_PORT || 8888;

Server.listen(PORT, async () => {
  DatabaseService.sync(); // Connect and sync database models with Sequelize
  console.log('✅ Database connected');
  console.log(`here : http://localhost:${PORT}`);
});
