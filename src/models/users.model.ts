import { Sequelize, DataTypes, Model, ModelCtor } from 'sequelize';
interface AuthParams {
  username: string;
  name: string;
  email: string;
  password: string;
  flagRoles: number;
}

const UsersModel = (sequelize: Sequelize) : ModelCtor<Model<AuthParams>> => {
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
    },
    {
      freezeTableName: true,
      timestamps: false,
    }
  );
};

export default UsersModel;
