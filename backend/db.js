const mongoose = require('mongoose');
const mongoURI = 'mongodb+srv://FoodDelivery:food@cluster0.zkrlxyt.mongodb.net/FoodDelivery?retryWrites=true&w=majority';

const mongoDB = async () => {
    try {
        
        await mongoose.connect(mongoURI, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });
        console.log(`MongoDB connected`);

       
        const collection = mongoose.connection.db.collection("food_items");
        const collection1 = mongoose.connection.db.collection("foodCategory");

        
        const data = await collection.find({}).toArray();
        const data1 = await collection1.find({}).toArray();

      

        global.food_items = data;
        global.foodCategory = data1;

        
    } catch (error) {
        console.error('MongoDB connection error:', error);
    }
};

module.exports = mongoDB;
