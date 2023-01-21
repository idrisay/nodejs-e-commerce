const express = require("express");
const mongoose = require("mongoose");

require("dotenv").config();

const { logger } = require('./middleware/app.middleware')
const appRouter = require('./routes/app.route')
const productRouter = require('./routes/product.route')

const BACKEND_PORT = process.env.BACKEND_PORT || 3003;
const app = express();

mongoose.set("strictQuery", false);
mongoose.connect(
  process.env.DB_URL,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  },
  (err) => {
      if (err) throw err;
      else console.log('------> Connected to MongoDB <------')
  }
);

app.use(express.json()); //Used to parse JSON bodies
app.use(logger) // Logging
app.use('/', appRouter)
app.use('/products', productRouter)

app.listen(BACKEND_PORT, () => {
  console.log(`Listening http://localhost:${BACKEND_PORT}/`);
});
