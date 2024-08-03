const mongoose = require("mongoose");

const connectDatabase = async () => {

  const uri = `mongodb+srv://${process.env.MONGODB_USERNAME}:${process.env.MONGODB_PASSWORD}${process.env.MONGODB_URI}`;
  const conn = await mongoose.connect(uri);
  mongoose.connection.on(
    "error",
    console.error.bind(console, "connection error:")
  );
  mongoose.connection.once("open", () =>
    console.log(
      `MongoDB Connected: ${conn.connection.host}`
    )
  );
  console.log(`MongoDB Connected: ${conn.connection.host}`);
};

module.exports = connectDatabase;
