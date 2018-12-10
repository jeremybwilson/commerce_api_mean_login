// const book_router = require('./book.routes');
const product_router = require('./product.routes');
const auth_router = require('./auth.routes');
const router = require('express').Router();

module.exports = router
  // .use('/books', book_router)
  .use('/products', product_router)
  .use('/auth', auth_router);
