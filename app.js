const express = require("express");
const app = express();
const port = 3000;
const cors = require("cors");
const Controller = require("./controllers");

app.use(cors());
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.get("/pairs", Controller.getPairId);
app.get("/ticker/:pairId", Controller.getTicker);
app.post("/ticker/:pairId", Controller.saveRecord);

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
