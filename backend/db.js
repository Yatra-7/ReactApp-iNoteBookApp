const mongoose = require('mongoose');
async function connectToMongo() {
    try {
        await mongoose.connect('mongodb://localhost:27017/inotebook', {
            useNewUrlParser: true,
            useUnifiedTopology: true 
        });
        console.log('Connected to MongoDB!');
    } catch (err) {
        console.error('Error connecting to MongoDB:', err);
    }
}

module.exports = connectToMongo;