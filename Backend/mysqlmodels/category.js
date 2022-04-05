const { Sequelize, DataTypes } = require("sequelize");
const db = require("../dbsq");
const Category = db.define(
  "category",
  { name: { type: DataTypes.STRING }, description: { type: DataTypes.STRING } },
  { freezeTableName: true }
);
export default Category;
