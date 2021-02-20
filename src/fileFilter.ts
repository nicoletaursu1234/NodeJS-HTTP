export default (req, file, cb) => {
  if (file.size > 2 * 1024 * 1024) {
    req.fileValidationError = "The file is too big.";

    return cb(new Error("The file is too big"), false);
  }

  cb(null, true);
};
