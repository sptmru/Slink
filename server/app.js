const express = require('express');
const bodyParser = require('body-parser');
const corsMiddleware = require('./middleware/cors.middleware');
const authRouter = require("./routes/auth.routes")
const { generateUrl } = require('./utils/generateUrl')
const { checkHaveUrl, insertNewUrl, checkHaveShortUrl } = require('./db/db')

const app = express()
const port = 5555

app.use(corsMiddleware)
app.use(bodyParser.json());
app.use("/api/auth", authRouter);

// app.get('/', (req, res) => {
//   res.send('Hello World!')
// })

app.post('/', async (req, res) => {
  try {
    const originUrl = req.body.longUrl;
    console.log(originUrl);


    const checkUrl = await checkHaveUrl(originUrl);

    if (checkUrl) {
      res.setHeader('Content-Type', 'application/json');
      res.send(JSON.stringify({ message: checkUrl }));
    } else {
      const newShortUrl = generateUrl();
      await insertNewUrl(originUrl, newShortUrl);

      res.setHeader('Content-Type', 'application/json');
      res.send(JSON.stringify({ message: newShortUrl }));
    }

  } catch (error) {
    console.error(`Ошибка ${error}`);
    res.status(500).send(JSON.stringify({ error: 'Внутренняя ошибка сервера' }));
  }
});

app.get('/:link', async (req, res) => {
  const checkShortUrl = await checkHaveShortUrl(`localhost:5555/${req.params.link}`);
  if (checkShortUrl) {
    res.redirect(checkShortUrl)
  } else {
    res.redirect('/')
  }
});

app.listen(port, () => {
  console.log(`Порт открыт по адресу ${port}`)
})