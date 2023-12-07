const mongoose = require("mongoose");
const dotenv = require("dotenv");
const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const cookieParser = require("cookie-parser");
const auth = require("./routes/auth");
const project = require("./routes/project");
const collab = require("./routes/collab");
const users = require("./routes/users");
const collection = require("./routes/collection");
const feedback = require("./routes/feedback");
const connectDB = require("./db/conn");

//config file
dotenv.config({ path: "./config.env" });

//database Config
connectDB();
// require("./db/conn");

//rest Obj
const app = express();

//Cors
app.use(
  cors({
    origin: "http://localhost:5173",
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);

//middelwares
app.use(express.json());
app.use(morgan("dev"));
app.use(cookieParser());

// app.use(express.static(path.join(__dirname, "public")));
// const corsOptions = {
//   origin: "*",
//   credentials: true, //access-control-allow-credentials:true
//   optionSuccessStatus: 200,
// };

// app.use(cors(corsOptions));
app.use(express.static("uploads"));

//routes
app.use("/api/v1/auth", auth);
app.use("/api/v1", project);
app.use("/api/v1", collab);
app.use("/api/v1", users);
app.use("/api/v1", collection);
app.use("/api/v1", feedback);

// const user = require("./model/userSchema");
const PORT = process.env.PORT || 5000;
//db-connection string- securing Db string in .env
//mongodb+srv://mern:qQ4shRxHVLrUlLdH@cluster0.dkxyjpb.mongodb.net/merndevop?retryWrites=true&w=majority

const DB = process.env.DATABASE_URL;
// console.log(DB);

// middleware();

app.listen(PORT, () => {
  console.log(`server is running at: ${PORT}`);
});

app.get("/", (req, res) => {
  console.log(`hello this is server page`);
  res.send("SERVER Running Successfullly");
});
