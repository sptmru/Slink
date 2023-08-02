const express = require('express');
const bodyParser = require('body-parser');
const corsMiddleware = require('./middleware/cors.middleware');
const authRouter = require("./routes/auth.routes");
const linkRouter = require("./routes/link.routes");
const config = require("config");

const app = express()
const PORT = config.get('serverPort')

app.use(corsMiddleware);
app.use(bodyParser.json());
app.use("/api/auth", authRouter);
app.use("/", linkRouter);

app.listen(PORT, () => {
  console.log(`Порт открыт по адресу ${PORT}`)
})