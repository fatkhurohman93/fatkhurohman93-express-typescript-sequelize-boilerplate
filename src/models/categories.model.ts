import { Sequelize, DataTypes, Model, ModelCtor } from 'sequelize';
import * as Interface from '@interfaces/index';
import { commonColumn } from './commonColumn';

const CategoriesModel = (
  sequelize: Sequelize
): ModelCtor<Model<Interface.Categories>> => {
  return sequelize.define(
    'categories',
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
      productCategoryDiscount: {
        type: DataTypes.FLOAT,
      },
      productCategoryTax: {
        type: DataTypes.FLOAT,
      },
      ...commonColumn,
    },
    {
      freezeTableName: true,
      timestamps: false,
    }
  );
};

export default CategoriesModel;
