const express = require("express");
const router = require("./router/route");

const PORT = 3000;

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(router);

app.listen(PORT, () => {
    console.log(`server is running on: ` + PORT);
  });
