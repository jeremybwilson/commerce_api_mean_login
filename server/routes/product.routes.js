const { ProductController } = require('../controllers');
const router = require('express').Router();

//  /resource/:id /api/books/:id

module.exports = router
  //routes and controllers
  .get('/', ProductController.index)

  // create book route
  .post('/', ProductController.create)

  // show all books route
  .get('/:product_id', ProductController.show)

  // update individual book route
  .put('/:_id', ProductController.update)

  // delete book route
  .delete('/:_id', ProductController.delete)
