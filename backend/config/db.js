const mongoose = require("mongoose");
require("dotenv").config();

const connection = mongoose.connect(`${process.env.M_URL}/techstax`);

module.exports = connection;
