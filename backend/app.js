const express = require("express");
// const stuffRoute = require("./routes/stuff");
const userRoute = require("./routes/user");
const app = express();

app.use(express.json());
// app.use("api/book", stuffRoute);
app.use("api/auth/", userRoute);

module.exports = app;
