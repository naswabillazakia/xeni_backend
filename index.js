const express = require("express");
const router = require("./router/route");

const PORT = 5000;

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(router);

app.listen(PORT, '192.168.1.9',() => {
    console.log(`server is running on: ` + PORT);
  });
