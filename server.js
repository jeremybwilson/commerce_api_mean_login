const express = require('express'),
    session = require('express-session'),
    parser = require('body-parser'),
    cookieParser = require('cookie-parser'),
    logger = require('morgan'),
    path = require('path'),

    port = process.env.PORT || 8000,
    // invoke express and store the result in the variable app
    app = express();

app.use(express.static(path.join(__dirname, 'dist/public')));

app.use(parser.urlencoded({ extended: true }));
app.use(parser.json());
app.use( function(request, response, next){
    console.log(`requesting url: ${request.url}`);
    next();
});
app.use(cookieParser('superSekretKitteh123'));
app.use(logger('dev'));
app.use(session({
    saveUninitialized: false,
    secret:'superSekretKitteh',
    resave: false,
    name: 'session',
    rolling: true,
    cookie: {
        secure: false,
        httpOnly: false,
        maxAge: 600000
    }
}));

//connect to DB
require('./server/config/database');
app.use('/api', require('./server/routes'));
app.use(require('./server/routes/catchall.routes'));

// port
app.listen(port, () => console.log(`Express server listening on port ${port} for Angular Product API - MEAN Exam`));    // ES6 way
