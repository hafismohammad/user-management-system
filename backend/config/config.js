const mongoose = require("mongoose");

const mongoDB = async () => {
    try {
        const MONGOURL = process.env.MONGO_URL;
        await mongoose.connect(MONGOURL);
        console.log("Database connected successfully.");
    } catch (error) {
        console.error("Database connection error:", error);
    }
};

module.exports = mongoDB;
