require("dotenv").config();
const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const helmet = require("helmet");
const { NODE_ENV } = require("./config");
const usersRouter = require("./users/users-router");
const authRouter = require("./auth/auth-router");

const errorHandler = require("./error-handler");
const mealsRouter = require("./meals/meals-router");

const app = express();

const morganOption = NODE_ENV === "production" ? "tiny" : "common";

app.use(morgan(morganOption));
app.use(cors());
app.use(helmet());

app.use(mealsRouter);
app.use("/users", usersRouter);
app.use("/login", authRouter);

app.get("/", (req, res) => {
	res.send("Hello, world!");
});

app.use(errorHandler);

module.exports = app;
