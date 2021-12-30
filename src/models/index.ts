import { Sequelize } from 'sequelize';
import UsersModel from './users.model';

const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: './database/database.sqlite',
  logging: false,
  dialectOptions: { decimalNumbers: true },
});

const models = {
  users: UsersModel(sequelize),
};

export { sequelize, models };
