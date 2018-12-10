const router = require('express').Router();
const path = require('path');

module.exports = router
  .all('*', function(request, response) {

    console.log('catching a route - catchall route', request.url);
    //path to index file
    const indexPath = path.resolve('dist/public/index.html');

    response.sendFile(indexPath);

  });
