const mongoose = require('mongoose');
const numValidator = require('node-mongoose-validator');
const validator = require('validator');

const { Schema } = mongoose;

const ProductSchema = new Schema({
    id: {
        type: Number,
    },
    name: {
      type: String,
      required: [true, "Name is required"],
      minlength: [3, "Name must be at least 3 characters"],
      trim: true
    },
    quantity: {
      type: Number,
      required: [true, "You must enter a quantity"],
      min: [0, "Qty cannot be less than 0"]
    },
    price : {
      type: Number,
      required: [true, "You must enter a price"],
      min: [0, "Price cannot be less than 0"],
      trim: true
    }
}, {timestamps: true})

ProductSchema.path('quantity').validate(numValidator.$isNumeric({ message : 'Quantity must be an integer.' }));
ProductSchema.path('price').validate(numValidator.$isFloat({ message : 'Price must be a number or decimal value.' }));

module.exports = mongoose.model('Product', ProductSchema);
