var fs = require("fs");
var json = {};

fs.readFile("logger.json", "utf8", function readFileCallback(err, data) {
  if (err) {
    console.log(err);
  } else {
    json = JSON.parse(data); //now it an object
  }
});

const logger = (req, res, next) => {
  let rtime = `${new Date().toISOString().slice(0, 10)}`;
  console.log("Request time: ", rtime);
  next();
};

module.exports = { logger };

// json = [...json, { time: rtime }];
// json = JSON.stringify(json);
// fs.writeFile("logger.json", json, "utf8", () => {
//   console.log("Logged");
// });