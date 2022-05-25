import { Sequelize, DataTypes, Model, ModelCtor } from 'sequelize';
import * as Interface from '@interfaces/index';
import { commonColumn } from './commonColumn';

const ProductsModel = (
  sequelize: Sequelize
): ModelCtor<Model<Interface.Products>> => {
  return sequelize.define(
    'products',
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
      stock: {
        type: DataTypes.FLOAT,
      },
      unit: {
        type: DataTypes.STRING,
      },
      price: {
        type: DataTypes.FLOAT,
      },
      sellPrice: {
        type: DataTypes.FLOAT,
      },
      productDiscount: {
        type: DataTypes.FLOAT,
      },
      productTax: {
        type: DataTypes.FLOAT,
      },
      active: {
        type: DataTypes.BOOLEAN,
      },
      categoryID: {
        type: DataTypes.MEDIUMINT,
        allowNull: false,
      },
      supplierID: {
        type: DataTypes.MEDIUMINT,
        allowNull: false,
      },
      ...commonColumn,
    },
    {
      freezeTableName: true,
      timestamps: false,
    }
  );
};

export default ProductsModel;
