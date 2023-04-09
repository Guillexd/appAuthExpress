import mongoose from "mongoose";
import mongoosePaginate from 'mongoose-paginate-v2';

const squemamodel = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    index: true
  },
  des: {
    type: String,
    required: true
  },
  price: {
    type: Number,
    required: true
  },
  thumbnail: {
    type: String
  },
  stock: {
    type: Number,
    required: true
  },
  category: {
    type: String,
    required: true
  },
  status: {
    type: Boolean,
    default: true
  }
})
//plugin pagination
squemamodel.plugin(mongoosePaginate);

const model = mongoose.model('Products', squemamodel);

export default model;