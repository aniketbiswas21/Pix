/**
 * This is a custom storage engine for multer
 */
const cloudinary = require("./cloudinary-config");
const { getUri } = require("../utils/getUri");

const getDestination = (req, file, cb) => {
  cb(null, "/dev/null");
};

function CustomStorage(opts) {
  this.getDestination = opts.destination || getDestination;
}

CustomStorage.prototype._handleFile = function _handleFile(req, file, cb) {
  this.getDestination(req, file, (err, path) => {
    if (err) return cb(err);
    getUri(file.stream, file).then((uri) => {
      cloudinary.uploader
        .unsigned_upload(uri, "peih39el")
        .then((result) => {
          cb(null, { url: result.secure_url });
        })
        .catch((err) => {
          console.log(err);
          cb(err);
        });
    });
  });
};

module.exports = function (opts) {
  return new CustomStorage(opts);
};
