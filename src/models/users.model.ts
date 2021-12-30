import { Sequelize, DataTypes, Model, ModelCtor } from 'sequelize';
import * as Interface from '@interfaces/index';


const UsersModel = (sequelize: Sequelize) : ModelCtor<Model<Interface.Users>> => {
  return sequelize.define(
    'users',
    {
      username: {
        type: DataTypes.STRING('16'),
      },
      name: {
        type: DataTypes.STRING('30'),
      },
      email: {
        type: DataTypes.STRING('30'),
      },
      password: {
        type: DataTypes.STRING,
      },
      flagRoles: {
        type: DataTypes.INTEGER,
      },
      image: {
        type: DataTypes.STRING,
      },
    },
    {
      freezeTableName: true,
      timestamps: false,
    }
  );
};

export default UsersModel;
