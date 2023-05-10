import mongoose from 'mongoose';

const Schema = mongoose.Schema;
const productSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  body: {
    type: String,
    required: true,
  }
});

// module.exports = mongoose.model('Book', BookSchema);
const Product = mongoose.model('Product', productSchema);
export default Product;