import { sequelize } from "./models/connection";
import { User, Product } from "./models";

sequelize.sync({ alter: true }).then((res) => {
  console.log(res);
  User.findAll()
});