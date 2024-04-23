const mongoose = require('mongoose');


const db = async () => {
    
    try {
        await mongoose.connect(process.env.MONGO_URL)
        console.log('DB connected')
    } catch (error) {
        console.error('DB Connection Error', error)
        throw error;
    }
}

module.exports = {db}