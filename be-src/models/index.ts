import { User } from "./user";
import { Product } from "./product";

User.hasMany(Product);
Product.belongsTo(User);

export { User, Product };
