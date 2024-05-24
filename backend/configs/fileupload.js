const expressFileupload = require("express-fileupload");
const path = require("path");

const fileupload = () => {
  return expressFileupload({
    useTempFiles: true,
    tempFileDir: path.join(__dirname, "../tmp"),
  });
};

module.exports = fileupload;
