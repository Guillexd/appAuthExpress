import mongoose from "mongoose";

const URL_MONGODB = 'mongodb+srv://enrique:elmejor89@clusterguille.4in3fwr.mongodb.net/db_entregable?retryWrites=true&w=majority';
mongoose.set('strictQuery', true);
mongoose.connect(URL_MONGODB, (err) => {
  if (err) {
    console.log(err);
  } else {
    console.log('Succefully connected to mongoDB')
  }
})