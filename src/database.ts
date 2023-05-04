import { Sequelize } from 'sequelize-typescript';

import { CompanyModel, EmployeeModel } from './models';

const models = [CompanyModel, EmployeeModel];

const database = new Sequelize({
  username: process.env.PG_USER,
  password: process.env.PG_PASSWORD,
  database: process.env.PG_DATABASE,
  dialect: 'postgres',

  define: { underscored: true },
  logging: false,
  models,
});

// database.sync({ alter: true });
// database.sync({ force: true });
// database.drop({ cascade: true });

export default database;
