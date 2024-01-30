import { DatabaseService } from './src/database/DatabaseService';

beforeAll(async () => {
  // await DatabaseService.sync();
  await DatabaseService.clear();
});
