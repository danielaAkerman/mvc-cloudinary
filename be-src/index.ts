import * as express from "express";
import { sequelize } from "./db";
import { User, Product } from "./db/models";

const port = process.env.PORT || 3000;
const app = express();
app.use(express.json());

// sequelize.sync({ force: true }).then((res) => {
//   console.log(res);
//   User.findAll()
// });

app.post("/test", async (req, res) => {
  // const user = await User.create({
  //   username: "Pancha",
  // });

  // const product = await Product.create({
  //   title: "Cucha",
  //   price: 4900,
  //   UserId: 1,
  // });

  const products = await Product.findAll({
    where: {
      UserId: 1,
    },
    include: [User],
  });

  res.json({ products });
});

app.listen(port, () => {
  console.log("Corriendo en puerto http://localhost:" + port);
});
