const express = require('express')
const bodyParser = require('body-parser');
const corsMiddleware = require('./middleware/cors.middleware')
const app = express()
const port = 3000

app.use(corsMiddleware)
// app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json());

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.post('/', function (req, res) {
  try {
    const body = req.body.longUrl;
    console.log(body);
    res.setHeader('Content-Type', 'application/json');
    res.send(JSON.stringify({ message: `Возвращаем ${body}` }));
  } catch (error) {
    console.error(`Ошибка ${error}`);
    res.status(500).send(JSON.stringify({ error: 'Внутренняя ошибка сервера' }));
  }
});



app.listen(port, () => {
  console.log(`Порт открыт по адресу ${port}`)
})