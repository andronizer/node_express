const db = require('./db/postgres')

const express = require('express')
const app = express()
const port = 3000

// app.use((err, req, res, next) => {
//     console.log(err.stack);
//     res.status(500).send('Smth broke!')
// });

db.sync();

app.get('/', function (req, res) {
    res.send('Hello World');
  });

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
})