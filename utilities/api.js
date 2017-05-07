var https = require('https');

var options = {
  host: 'ccafeueb-s.herokuapp.com',
  port: 443,
  path: '',
  method: ''
}

var get = function(uri, response, error){
  options.path = uri;
  options.method = 'GET';

  var req = https.request(options, function(res){
    res.setEncoding('utf8');
    res.on('data', function(chunk){
      response(JSON.parse(chunk));
    });
  });

  req.on('error', error);
  //req.write(ALGO);
  req.end();
}


// Export the functions for external access
module.exports = {
  get: get
};