import * as express from "express";
import * as path from "path";
import * as crypto from "crypto";
import * as jwt from "jsonwebtoken";
import { User, Product, Auth } from "./models";
import {} from "./controllers/users-controller";
import { createProduct } from "./controllers/products-controller";
import {} from "./controllers/auth-controller";

const port = process.env.PORT || 3000;
const app = express();
app.use(express.json());

const SECRET = "CS90AJN3458DFGN34NLSD0U4JI28UVS0U3MK23RO";

function getSHA256ofJSON(text: string) {
  return crypto.createHash("sha256").update(text).digest("hex");
}

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




// signUp
app.post("/auth", async (req, res) => {
  const { email, name, birthdate, password } = req.body;
  const [user, created] = await User.findOrCreate({
    where: {
      email: req.body.email,
    },
    defaults: {
      email,
      name,
      birthdate,
    },
  });

  const [auth, authCreated] = await Auth.findOrCreate({
    where: {
      user_id: user.dataValues.id,
    },
    defaults: {
      email,
      password: getSHA256ofJSON(password),
      user_id: user.dataValues.id,
    },
  });
  console.log({ authCreated, auth });
  res.json(auth);
});

// signIn
app.post("/auth/token", async (req, res) => {
  const { email, password } = req.body;
  const passHash = getSHA256ofJSON(password);
  const auth = await Auth.findOne({
    where: {
      email,
      password: passHash,
    },
  });
  const token = jwt.sign({ id: auth.dataValues.user_id }, SECRET);
  // Si no hay registro de ese usuario y esa contraseña, devuelve null
  if (auth) {
    res.json({ token });
  } else {
    res.status(401).json({ messaje: "not found" });
  }
});

async function authMiddleware(req, res, next) {
  const token = req.headers.authorization.split(" ")[1];
  try {
    const data = jwt.verify(token, SECRET);
    req._user = data;
    next();
  } catch (e) {
    res.status(401).json({ error: true });
  }
}

app.get("/me", authMiddleware, async (req, res) => {
  const foundId = req._user.id;
  // const foundUser = await User.findOne({ where: { id: foundId } });
  const foundUser = await User.findByPk(req._user.id);
  res.json(foundUser);
});






app.get("*", function (req, res) {
  const ruta = path.resolve(__dirname, "../fe-dist/index.html");
  res.sendFile(ruta);
});
app.listen(port, () => {
  console.log("Corriendo en puerto http://localhost:" + port);
});
