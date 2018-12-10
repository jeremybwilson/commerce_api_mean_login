const mongoose = require('mongoose');
const path = require('path');
const fs = require('fs');
const reg = new RegExp('\\.js$', 'i');

//path to models
const modelsPath = path.resolve('server/models');

//connect to DB
mongoose.connect('mongodb://localhost:27017/commerce_mean_exam', { useNewUrlParser:true });
mongoose.connection.on('connected', () => console.log(`MongoDB connected to the Angular Product API - MEAN Exam`));

fs.readdirSync(modelsPath).forEach(file => {
    if (reg.test(file)) {
        require(path.join(modelsPath, file));
    }
});
