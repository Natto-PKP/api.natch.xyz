import { Sequelize } from 'sequelize-typescript';
import '../dotenv';

import {
  UserModel,
  UserRelatedAccountModel,
  ProfileModel,
  ProfileHasUserRelatedAccountModel,
  ProfileTagModel,
  ProfileHasTagModel,
  CommunityModel,
  CommunityGroupModel,
  CommunityTagModel,
  CommunityHasTagModel,
  CommunityInviteModel,
  CommunityRoleModel,
  MemberModel,
  MemberHasRoleModel,
} from './entities';

const models = [
  UserModel,
  UserRelatedAccountModel,
  ProfileModel,
  ProfileHasUserRelatedAccountModel,
  ProfileTagModel,
  ProfileHasTagModel,
  CommunityModel,
  CommunityGroupModel,
  CommunityTagModel,
  CommunityHasTagModel,
  CommunityInviteModel,
  CommunityRoleModel,
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
    await connection.drop();
    await connection.sync();
  }

  static async truncate() {
    await connection.truncate({ cascade: true, restartIdentity: true });
  }
}
