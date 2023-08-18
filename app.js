// ℹ️ Gets access to environment variables/settings
// https://www.npmjs.com/package/dotenv
require("dotenv").config();

// ℹ️ Connects to the database
require("./db");

// Handles http requests (express is node js framework)
// https://www.npmjs.com/package/express
const express = require("express");

const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const favicon = require("serve-favicon");
const mongoose = require("mongoose");
const logger = require("morgan");
const path = require("path");
const cors = require("cors");

// mongoose
//     .connect("mongodb://localhost/cloudinary-server", { useNewUrlParser: true })
//     .then((x) => {
//         console.log(
//             `Connected to Mongo! Database name: "${x.connections[0].name}"`
//         );
//     })
//     .catch((err) => {
//         console.error("Error connecting to mongo", err);
//     });

const app_name = require("./package.json").name;
const debug = require("debug")(
    `${app_name}:${path.basename(__filename).split(".")[0]}`
);

const app = express();

app.use(logger("dev"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

app.use(
    require("node-sass-middleware")({
        src: path.join(__dirname, "public"),
        dest: path.join(__dirname, "public"),
        sourceMap: true,
    })
);

app.use(express.static(path.join(__dirname, "public")));
// app.use(favicon(path.join(__dirname, "public", "images", "favicon.ico")));

app.use(
    cors({
        credentials: true,
        origin: true,
    })
);

// ℹ️ This function is getting exported from the config folder. It runs most pieces of middleware
require("./config")(app);

// 👇 Start handling routes here
const indexRoutes = require("./routes/index.routes");
app.use("/api", indexRoutes);

const authRoutes = require("./routes/auth.routes");
app.use("/auth", authRoutes);


app.use("/api", require("./routes/photo.routes"));
app.use("/api", require("./routes/fileUpload"));
app.use("/article", require("./routes/article.routes"));
app.use("/meet", require("./routes/meet.routes"));
app.use("/photo", require("./routes/photo.routes"))

// ❗ To handle errors. Routes that don't exist or errors that you handle in specific routes
require("./error-handling")(app);

module.exports = app;
