require('dotenv').config();

const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const authRouter = require("./routes/auth.routes");
const linkRouter = require("./routes/link.routes");
const config = require("./config/config");
const cron = require('node-cron');
const { deleteData } = require('./db/db');

const app = express()
const PORT = config.port;


app.use(cors({
  origin: true,
}));

app.use(bodyParser.json());
app.use("/api/auth", authRouter);
app.use("/", linkRouter);


cron.schedule('00 12 * * 1 ', () => {
  deleteData();
});


app.listen(PORT, () => {
  console.log(`The server was started at ${PORT}`);
})