const express = require('express');
const bodyParser = require('body-parser');
// const corsMiddleware = require('./middleware/cors.middleware');
const cors = require('cors');
const authRouter = require("./routes/auth.routes");
const linksRouter = require("./routes/links.routes");
const linkRouter = require("./routes/link.routes");
const config = require("./config/config");
const cron = require('node-cron');
const { deleteData } = require('./db/db');

const app = express()
const PORT = config.port;

// app.use(corsMiddleware);

app.use(cors({
  origin: true,
}));

app.use(bodyParser.json());
app.use("/api/auth", authRouter);
app.use("/api/links", linksRouter);
app.use("/", linkRouter);


cron.schedule('00 12 * * 1 ', () => {
  deleteData();
});


app.listen(PORT, () => {
  console.log(`The server was started at ${PORT}`);
})