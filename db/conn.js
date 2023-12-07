const mongoose = require("mongoose");

// const DB = process.env.DATABASE_URL;
// console.log(DB);

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.DATABASE_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log(`Conneted To Mongodb Databse ${conn.connection.host}`);
  } catch (error) {
    console.log(`Error in Mongodb ${error}`);
  }
};

module.exports = connectDB;

// mongoose
//   .connect(DB, {
//     useNewUrlParser: true,
//     useUnifiedTopology: true,
//     // useCreateIndex: true,
//     // useFindAndModify: false,
//     family: 4,
//   })
//   .then(() => {
//     console.log("Connected to the database successfully");
//   })
//   .catch((err) => {
//     console.error("Database connection failed:", err.message);
//   });
