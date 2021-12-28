import { Sequelize } from 'sequelize';
import UsersModel from './users.model';
const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: './src/models/db/database.sqlite',
  logging: false,
});
const models = {
  users: UsersModel(sequelize),
};

export { sequelize, models };
