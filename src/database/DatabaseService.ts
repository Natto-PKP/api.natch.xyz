import { Sequelize } from 'sequelize-typescript';
import '../dotenv';

import {
  PlatformModel,
  TagModel,
  UserModel,
  UserHasPlatformModel,
  ProfileModel,
  ProfileHasPlatformModel,
  ProfileHasTagModel,
  TeamModel,
  TeamHasPlatformModel,
  TeamHasTagModel,
  TeamInviteModel,
  TeamRoleModel,
  MemberModel,
  MemberHasRoleModel,
} from './entities';

const models = [
  PlatformModel,
  TagModel,
  UserModel,
  UserHasPlatformModel,
  ProfileModel,
  ProfileHasPlatformModel,
  ProfileHasTagModel,
  TeamModel,
  TeamHasPlatformModel,
  TeamHasTagModel,
  TeamInviteModel,
  TeamRoleModel,
  MemberModel,
  MemberHasRoleModel,
];

const connection = new Sequelize({
  username: process.env.PG_USER,
  password: process.env.PG_PASSWORD,
  database: process.env.PG_DATABASE,
  host: process.env.PG_HOST || 'localhost',
  dialect: 'postgres',

  define: { underscored: true, timestamps: true },
  logging: false,
  models,
});

export class DatabaseService {
  static async connect() {
    await connection.authenticate();
  }

  static async disconnect() {
    await connection.close();
  }

  static get connection() {
    return connection;
  }

  static get models() {
    return models;
  }

  static async sync() {
    await connection.sync();
  }

  static async clear() {
    await connection.drop({ cascade: true });
    await connection.sync();
  }

  static async truncate() {
    await connection.truncate({ cascade: true, restartIdentity: true });
  }
}
