import { Sequelize } from 'sequelize-typescript';
import dotenv from 'dotenv';
import { UserModel, TarotCardModel, UserTarotCardModel } from './models';

dotenv.config();

const models = [UserModel, TarotCardModel, UserTarotCardModel];

const database = new Sequelize({
  username: process.env.PG_USER,
  password: process.env.PG_PASSWORD,
  database: process.env.PG_DATABASE,
  dialect: 'postgres',

  define: { underscored: true },
  logging: false,
  models,
});

database.sync({ alter: true });
// database.drop({ cascade: true });
// database.sync({ force: true }).then(async () => {
//   const password = await bcrypt.hash('IreallyL0veFerret!', 10);
//   UserModel.create({
//     username: 'system',
//     password,
//     email: 'system@system.com',
//     pseudo: 'System',
//     roles: ['OWNER', 'BASIC_USER'],
//     permissions: UserPermissionArray,
//   });
// });

export default database;
