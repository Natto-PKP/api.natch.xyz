import { DatabaseService } from './src/database/DatabaseService';

beforeAll(async () => {
  await DatabaseService.sync();
});

afterEach(async () => {
  await DatabaseService.truncate();
});
