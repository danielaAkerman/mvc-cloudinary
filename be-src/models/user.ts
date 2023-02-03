import { Model, DataTypes } from "sequelize";
import { sequelize } from "./connection";

export class User extends Model {}
User.init(
  {
    username: { type: DataTypes.STRING },
    lastname: { type: DataTypes.STRING },
    birthday: { type: DataTypes.DATEONLY }
  },
  { sequelize, modelName: "User" }
);
