const fs = require('fs');

function logger(req, res, next) {
  const requestData = {
    method: req.method,
    url: req.originalUrl,
    headers: req.headers,
    body: req.body
  };

  const originalSend = res.send;
  res.send = function (body) {
    const responseData = {
      status: res.statusCode,
      headers: res.getHeaders(),
      body: body
    };

    const logData = {
      request: requestData,
      response: responseData
    };

    fs.appendFile('app.log', JSON.stringify(logData) + '\n', (err) => {
      if (err) console.error(err);
    });

    originalSend.call(res, body);
  };

  next();
}

module.exports = { logger };