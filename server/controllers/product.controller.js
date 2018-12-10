const Product = require('mongoose').model('Product');
const { Http } = require('@status/codes');

module.exports = {
    index(request, response) {
      console.log('requesting all products');
      Product.find({})
          // .populate('author')
          .then(products => response.json(products))
          // .catch(console.log);
          .catch(error => {
              console.log(`something went wrong with the index route`);
              response.status(500).json(error);
          });
    },
    create(request, response) {
        console.log('inside the product create controller', request.body);
        Product.create(request.body)
            .then(product => {
                console.log('created product', product);
                response.json(product);
            })
            // this catch is only good for validation errors, so if expecting other kind of errors,
            // simply console log while we learn how to handle others
            .catch(error => {
                console.log('got an error', error);
                // collect the errors into an errors array
                const errors = Object.keys(error.errors)
                    // map every field that failed to a message
                    .map(key => error.errors[key].message);
                    console.log(errors);
                    // change the response status to unprocessable entity. if we don't change status,
                    // it will go out ot client as having no errors
                    response.status(Http.UnprocessableEntity).json(errors);
            });
    },
    show(request, response) {
        console.log('we are in the show route, here is the product_id', request.params.product_id)
        Product.findById(request.params.product_id)
            // .populate('author')
            .then(product => {
              // console.log('we found the product by its Id', request.params.product);
              response.json(product);
            })
            // .catch(console.log);
            .catch(error => {
                console.log(`something went wrong with show request`);
            });
    },
    update(request, response) {
        console.log('controller got a request to update', request.params._id, request.body);
        Product.findByIdAndUpdate(request.params._id, request.body, { new: true })
            .then(product => response.json(product))
            // .catch(console.log);
            .catch(error => {
                console.log(`something went wrong with the update request`);
            });
    },
    delete(request, response) {
      console.log('received a request to delete a product id', request.params._id);
      Product.findByIdAndDelete(request.params._id)
          .then(product => {
              console.log('successfully deleted a record');
              response.json(product)
          })
          // .catch(console.log);
          .catch(error => {
              console.log(`something went wrong with the delete request`);
          });
    }
};
