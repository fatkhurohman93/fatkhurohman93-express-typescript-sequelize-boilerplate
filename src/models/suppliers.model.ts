import { Sequelize, DataTypes, Model, ModelCtor } from 'sequelize';
import * as Interface from '@interfaces/index';
import { commonColumn } from './commonColumn';

const SuppliersModel = (
  sequelize: Sequelize
): ModelCtor<Model<Interface.Suppliers>> => {
  return sequelize.define(
    'suppliers',
    {
      name: {
        type: DataTypes.STRING('30'),
        allowNull: false,
      },
      description: {
        type: DataTypes.STRING,
      },
      code: {
        type: DataTypes.STRING('10'),
      },
      image: {
        type: DataTypes.STRING,
      },
      address: {
        type: DataTypes.STRING,
      },
      phone: {
        type: DataTypes.STRING('16'),
      },
      whatsapp: {
        type: DataTypes.STRING('16'),
      },
      email: {
        type: DataTypes.STRING('30'),
      },
      facebook: {
        type: DataTypes.STRING('20'),
      },
      instagram: {
        type: DataTypes.STRING('20'),
      },
      twitter: {
        type: DataTypes.STRING('20'),
      },
      ...commonColumn,
    },
    {
      freezeTableName: true,
      timestamps: false,
    }
  );
};

export default SuppliersModel;
