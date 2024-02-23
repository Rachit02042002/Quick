// const mongoose = require('mongoose')
// const mongoURI = 'mongodb+srv://FoodDelivery:food@cluster0.zkrlxyt.mongodb.net/FoodDelivery?retryWrites=true&w=majority'


// const mongoDB = async()=>{
//    await mongoose.connect(mongoURI).then((data)=>{
//         console.log(`Mongodb connected with server`);
//         const fetched_data = mongoose.connection.db.collection("food_items");
//         fetched_data.find({}).toArray(function(err,data){
//             if(err)console.log(err);
//             else console.log(data);
//         })
//     }).catch((err)=>{
//         console.log(err)
//     })
// }

// module.exports = mongoDB;


const mongoose = require('mongoose');
const mongoURI = 'mongodb+srv://FoodDelivery:food@cluster0.zkrlxyt.mongodb.net/FoodDelivery?retryWrites=true&w=majority';

const mongoDB = async () => {
    try {
        // Connect to MongoDB
        await mongoose.connect(mongoURI, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });
        console.log(`MongoDB connected`);

        //Access the "food_items" collection
        const collection = mongoose.connection.db.collection("food_items");
        const collection1 = mongoose.connection.db.collection("foodCategory");

        // Fetch data from the collection
        const data = await collection.find({}).toArray();
        const data1 = await collection1.find({}).toArray();

        // Display the fetched data

        global.food_items = data;
        global.foodCategory = data1;

        // const fetched_data = await mongoose.connection.db.collection("food_items");
        // fetched_data.find({}).toArray(async function (err,data){
        //     const foodCategory = await mongoose.connection.db.collection("foodCategory");
        //     foodCategory.find({}).toArray(function(err,catData){
        //         console.log(data);
        //         console.log(catData);
        //         if(err)console.log(err);
        //         else{
        //             global.food_items=data;
        //             global.foodCategory = catData;
        //         }
        //     })
        // })
        
    } catch (error) {
        console.error('MongoDB connection error:', error);
    }
};

module.exports = mongoDB;
