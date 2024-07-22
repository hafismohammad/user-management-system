const express = require("express");
const dotenv = require("dotenv").config();
const mongoDB = require('./config/config');
const cors = require('cors');
const cookieParser = require('cookie-parser');

const port = process.env.PORT || 3001;

mongoDB()

const app = express();

// Middleware to parse JSON request bodies
app.use(express.json());

// Middleware to parse cookies
app.use(cookieParser());

app.use(cors());

const userRoutes = require("./routes/userRoutes");
app.use("/", userRoutes);

app.listen(port, () => console.log(`Server running on port ${port}`));
