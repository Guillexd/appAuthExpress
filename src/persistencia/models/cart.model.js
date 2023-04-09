import mongoose from "mongoose";

const squemamodel = new mongoose.Schema({
  time: {
    type: Date,
    required: true
  },
  products: [
    {
      product:{ //porque en ves de guardar con este nombre 'product' lo guarda con '_id'
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Products'
      } ,
      quantity: {
        type: Number,
        default: 1
      }
    }
  ]
})

//this middleware doesn't work without find
// squemamodel.pre('findById', function(next){
//   this.populate('products');
//   next();
// })

const model = mongoose.model('Carts', squemamodel);

export default model;