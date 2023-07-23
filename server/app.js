const express = require('express')
const bodyParser = require('body-parser');
const corsMiddleware = require('./middleware/cors.middleware')
const { generateUrl } = require('./utils/generateUrl')
const { checkHaveUrl, insertNewUrl } = require('./db/db')

const app = express()
const port = 3000

app.use(corsMiddleware)
// app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json());

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.post('/', async function (req, res) {
  try {
    const originUrl = req.body.longUrl;
    console.log(originUrl);


    const checkUrl = await checkHaveUrl(originUrl);
    console.log(checkUrl);

    if(checkUrl) {
      res.setHeader('Content-Type', 'application/json');
      res.send(JSON.stringify({ message: checkUrl }));
    } else {
      const newShortUrl = generateUrl(originUrl);
      await insertNewUrl(originUrl, newShortUrl);

      res.setHeader('Content-Type', 'application/json');
      res.send(JSON.stringify({ message: newShortUrl }));
    }

  } catch (error) {
    console.error(`Ошибка ${error}`);
    res.status(500).send(JSON.stringify({ error: 'Внутренняя ошибка сервера' }));
  }
});

app.listen(port, () => {
  console.log(`Порт открыт по адресу ${port}`)
})