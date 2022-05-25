import { DataTypes } from 'sequelize';

export const commonColumn = {
  createdTime: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  createdDate: {
    type: DataTypes.DATEONLY,
    allowNull: false,
  },
  year: {
    type: DataTypes.SMALLINT,
    allowNull: false,
  },
  lastUpdatedTime: {
    type: DataTypes.DATE,
  },
  month: {
    type: DataTypes.SMALLINT,
    allowNull: false,
  },
  createdBy: {
    type: DataTypes.STRING('16'),
  },
  lastUpdatedBy: {
    type: DataTypes.STRING('16'),
  },
};
