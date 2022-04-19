if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}
const express = require("express");
const app = express();
const router = require("./router/index");
const errHandler = require("./middlewares/error-handler");
const cors = require("cors");
const Controller = require("./controllers");

const port = process.env.PORT || 3000;

app.use(cors());
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use(router);

app.use(errHandler);

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
