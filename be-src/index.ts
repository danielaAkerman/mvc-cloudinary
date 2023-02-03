import * as express from "express";
import * as path from "path";
import { User, Product } from "./models";
import {} from "./controllers/auth-controller";
import { createProduct } from "./controllers/products-controller";
import {} from "./controllers/users-controller";

const port = process.env.PORT || 3000;
const app = express();
app.use(express.json());

// LA RECEPCIÓN DE LOS DATOS (body, params, etc) SE CHEQUEA EN ESTA INSTANCIA

app.post("/products", async (req, res) => {
  if (!req.body) {
    res.status(400).json({
      message: "Falta el body",
    });
  }
  const newProduct = await createProduct(1, req.body);

  res.json({ Product: newProduct });
});

app.get("*", function (req, res) {
  const ruta = path.resolve(__dirname, "../fe-dist/index.html");
  res.sendFile(ruta);
});
app.listen(port, () => {
  console.log("Corriendo en puerto http://localhost:" + port);
});
