// db.js
// const mongoose = require('mongoose');
// const mongoURI = 'mongodb://sahilkokate91:gofood@ac-r2oquai-shard-00-00.rnkjoop.mongodb.net:27017,ac-r2oquai-shard-00-01.rnkjoop.mongodb.net:27017,ac-r2oquai-shard-00-02.rnkjoop.mongodb.net:27017/gofood?ssl=true&replicaSet=atlas-30n38l-shard-0&authSource=admin&retryWrites=true&w=majority';


//   const connectToMongo = async () => {
//     try {
//      mongoose.set("strictQuery", false);
//       await mongoose.connect(mongoURI);
//       console.log("Connected to Mongo Successfully!");
       
//      console.log("working");
//      await mongoose.connection.db.collection('food_item').find({}).toArray().then((data) => {

//           if(data.length > 0){
//           console.log(data);
          
          
//           return data

//           }else{
//             console.log("No data");
//           }

          
//       });
    
// } catch (error) {
//       console.log(error);
//     }
//   };


  
// module.exports ={connectToMongo,mongoose};

// db.js
// db.js
const mongoose = require('mongoose');
//const mongoURI = 'mongodb+srv://sahilkokate91:gofood@cluster0.rnkjoop.mongodb.net/gofood?retryWrites=true&w=majority';
  const mongoURI = 'mongodb+srv://sahilkokate91:gofood@cluster0.rnkjoop.mongodb.net/gofood?retryWrites=true&w=majority'
mongoose.set("strictQuery", false);

const connectToMongo = async () => {
  try {
    await mongoose.connect(mongoURI, {
      // useNewUrlParser: true,
      // useUnifiedTopology: true,
    });
    console.log('Connected to MongoDB');
  } catch (error) {
    console.error('Error connecting to MongoDB:', error);
    // Handle the error appropriately
  }
};

module.exports = { connectToMongo, mongoose };





