const ErrorResponse = require("../utils");

const errorHandler = (err, _req, res, next) => {
  let error = { ...err };

  error.message = err.message;
  //Log to console for dev
  console.log("ERROR: ", err);

  //Mongoose bad ObjectId
  if (err.name === "CastError") {
    const message = `Resource not found with id of ${err.value}`;
    error = new ErrorResponse(message, 404);
  }
  //Mongoose validation error
  if (err.name === "ValidationError") {
    const message = Object.values(err.errors).map((value) => value.message);
    error = new ErrorResponse(message, 400);
  }
  //Mongoose duplicate key
  if (err.code === 11000 || err.code === 11001) {
    let message = "";
    const match = error.message.match(
      /index: (\w+)_1 dup key: { (\w+): "(.+)" }/
    );
    if (match) {
      const keyName = match[2];
      const duplicateValue = match[3];
      const formattedKey = keyName
        .split("_")
        .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
        .join(" ");
      message = `${formattedKey} ${duplicateValue} already exists`;
    } else {
      message = "Name already exists";
    }
    error = new ErrorResponse(message, 409);
  }
  res
    .status(error.statusCode || 500)
    .json({ success: false, message: error.message || "Server Error" });

  next();
};

module.exports = errorHandler;
