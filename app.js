import express from 'express';
import bodyParser from 'body-parser';

const app = express()
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json())

// Routes import here 
import {checkRoute ,allProductsRoute, createProductRoute, updateProductRoute, deleteProductRoute} from './routes/productRoute.js'
// controller import here
import { checkAPI , getProuducts, createProduct, updateProduct, deleteProduct } from './controlors/productController.js';

// All request goes here
app.get(checkRoute, checkAPI);
app.get(allProductsRoute, getProuducts);
app.post(createProductRoute, createProduct);
app.put(updateProductRoute, updateProduct);
app.delete(deleteProductRoute, deleteProduct )

export default app;