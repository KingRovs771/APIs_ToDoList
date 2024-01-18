const bodyParser = require('body-parser');
const express = require('express');
const app = express();
let dotenv = require('dotenv').config();

let PORT;
process.env.STATUS === 'development' ? (PORT = process.env.DEV_PORT) : (PORT = process.env.PROD_PORT);

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

const routes = require('../routes/router');
routes(app);

app.listen(PORT, () => {
  console.log(`Server is Started on port ` + PORT);
});
