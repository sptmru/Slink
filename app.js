const express = require('express')
const bodyParser = require('body-parser');

const app = express()
const port = 3000

let urlParser = bodyParser.urlencoded({ extended: false })

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.post('/', urlParser, function (req, res) {
  let body = '';
  req.on('data', chunk => {
    body += chunk.toString();
  });
  req.on('end', () => {
    console.log(body);
  });
  res.sendStatus(200);
})

app.listen(port, () => {
  console.log(`Порт открыт по адресу ${port}`)
})