// // Importing necessary modules and packages
// const express = require("express");
// const app = express();
// const userRoutes = require("./routes/user");
// const profileRoutes = require("./routes/profile");
// const courseRoutes = require("./routes/Course");
// const paymentRoutes = require("./routes/Payments");
// const contactUsRoute = require("./routes/Contact");
// const database = require("./config/database");
// const cookieParser = require("cookie-parser");
// const cors = require("cors");
// const { cloudinaryConnect } = require("./config/cloudinary");
// const fileUpload = require("express-fileupload");
// const dotenv = require("dotenv");

// // Setting up port number
// const PORT = process.env.PORT || 4000;

// // Loading environment variables from .env file
// dotenv.config();

// // Connecting to database
// database.connect();
 
// // Middlewares
// app.use(express.json());
// app.use(cookieParser());
// const allowedOrigins = [
//   "https://edtech1-studynotion.vercel.app", // main frontend
//   "http://localhost:3000",                  // local dev (optional)
// ];

// app.use(
//   cors({
//     origin: function (origin, callback) {
//       // allow requests with no origin (like mobile apps, curl)
//       if (!origin) return callback(null, true);

//       if (allowedOrigins.includes(origin)) {
//         callback(null, true);
//       } else {
//         callback(new Error("Not allowed by CORS"));
//       }
//     },
//     credentials: true, const allowedOrigins = [
//   "https://edtech1-studynotion.vercel.app", // main frontend
//   "http://localhost:3000",                  // local dev (optional)
// ];

// app.use(
//   cors({
//     origin: function (origin, callback) {
//       // allow requests with no origin (like mobile apps, curl)
//       if (!origin) return callback(null, true);

//       if (allowedOrigins.includes(origin)) {
//         callback(null, true);
//       } else {
//         callback(new Error("Not allowed by CORS"));
//       }
//     },
//     credentials: true, // allow cookies/auth headers
//   })
// );

//   })
// );


// app.use(
// 	fileUpload({
// 		useTempFiles: true,
// 		tempFileDir: "/tmp/",
// 	})
// );

// // Connecting to cloudinary
// cloudinaryConnect();

// // Setting up routes
// app.use("/api/v1/auth", userRoutes);
// app.use("/api/v1/profile", profileRoutes);
// app.use("/api/v1/course", courseRoutes);
// app.use("/api/v1/payment", paymentRoutes);
// app.use("/api/v1/reach", contactUsRoute);

// // Testing the server
// app.get("/", (req, res) => {
// 	return res.json({
// 		success: true,
// 		message: "Your server is up and running ...",
// 	});
// });

// // Listening to the server
// app.listen(PORT, () => {
// 	console.log(`App is listening at ${PORT}`);
// });

// // End of code.


// server.js

// Importing necessary modules and packages
const express = require("express");
const app = express();
const userRoutes = require("./routes/user");
const profileRoutes = require("./routes/profile");
const courseRoutes = require("./routes/Course");
const paymentRoutes = require("./routes/Payments");
const contactUsRoute = require("./routes/Contact");
const database = require("./config/database");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const { cloudinaryConnect } = require("./config/cloudinary");
const fileUpload = require("express-fileupload");
const dotenv = require("dotenv");
const path = require("path");

// Setting up port number
const PORT = process.env.PORT || 4000;

// Loading environment variables from .env file
dotenv.config();

// Connecting to database
database.connect();

// Middlewares

// Increase body size limits for large video uploads
app.use(express.json({ limit: "100mb" }));
app.use(express.urlencoded({ limit: "100mb", extended: true }));

app.use(cookieParser());

const allowedOrigins = [
  "https://edtech1-studynotion.vercel.app", // main frontend
  "http://localhost:3000",                  // local dev (optional)
];

app.use(
  cors({
    origin: function (origin, callback) {
      // allow requests with no origin (like mobile apps, curl)
      if (!origin) return callback(null, true);

      if (allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    credentials: true, // allow cookies/auth headers
  })
);

// Configure file upload to support large files
app.use(
  fileUpload({
    useTempFiles: true,
    tempFileDir: path.join(__dirname, "/tmp/"),
    limits: { fileSize: 100 * 1024 * 1024 }, // 100 MB max
  })
);

// Connecting to Cloudinary
cloudinaryConnect();

// Setting up routes
app.use("/api/v1/auth", userRoutes);
app.use("/api/v1/profile", profileRoutes);
app.use("/api/v1/course", courseRoutes);
app.use("/api/v1/payment", paymentRoutes);
app.use("/api/v1/reach", contactUsRoute);

// Test server
app.get("/", (req, res) => {
  return res.json({
    success: true,
    message: "Your server is up and running ...",
  });
});

// Listening to the server
app.listen(PORT, () => {
  console.log(`App is listening at ${PORT}`);
});
