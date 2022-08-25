const mongoose = require('mongoose');

const connectDB = async () => {
    try {
        const connectMongoose = await mongoose.connect(process.env.DB_STR, { useNewUrlParser: true }, () => console.log("Connected to db!"))
    } catch (err) {
        console.error(err)
        process.exit(1)
    }
}

module.exports = connectDB