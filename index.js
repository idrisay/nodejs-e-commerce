const express = require("express");
const mongoose = require("mongoose");
const cors = require('cors');

require("dotenv").config();

const { logger } = require('./src/middleware/app.middleware')
const appRouter = require('./src/routes/app.route')
const productRouter = require('./src/routes/product.route')
const authRouter = require('./src/routes/auth.route')
const blogRouter = require('./src/routes/blog.route')

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
app.use(cors());
// app.use(cors({ origin: 'http://localhost:3000' }));

app.use(express.json()); //U sed to parse JSON bodies
app.use(logger) // Logging
app.use('/', appRouter)
app.use('/products', productRouter)
app.use('/auth', authRouter)
app.use('/blogs', blogRouter)

app.listen(BACKEND_PORT, () => {
  console.log(`Listening http://localhost:${BACKEND_PORT}/`);
});
