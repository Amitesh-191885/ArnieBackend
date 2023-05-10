import Product from '../models/product.js';
import { valideProduct, valideProductUpdate } from '../middleWares/productValidate.js';

export const checkAPI = async (req, res) => {
    try {
        if (req.body.name == "admin" && req.body.password == "admin") {
            res.json({
                "status": "200",
                "ack": {
                    "isSuccessfull": true,
                    "message": "Server is running"
                }
            })
        }
        else {
            res.json({
                "status": "200",
                "ack": {
                    "isSuccessfull": false,
                    "message": "Invalid credentials"
                }
            })
        }
    }
    catch (error) {
        res.json({
            "status": "404",
            "ack": {
                "isSuccessfull": false,
                "message": "Invalid Route"
            }
        })
    }
}

export const getProuducts = async (req, res) => {
    try {
        const products = await Product.find();
        if (products.length > 0) {
            res.json({
                "status": "200",
                "products": products,
                "ack": {
                    "isSuccessfull": true,
                    "message": "Products fetched successfully"
                }
            })
        }
        else {
            res.json({
                "status": "200",
                "products": products,
                "ack": {
                    "isSuccessfull": false,
                    "message": "No products found"
                }
            })
        }
    } catch (err) {
        res.status(404).json({ message: err });
    }
}

export const createProduct = async (req, res) => {
    const product = req.body;
    try {
        if (valideProduct(req) === false) {
            res.json({
                "status": "200",
                "product Fileds": product,
                "ack": {
                    "isSuccessfull": false,
                    "message": "Required fields are missing"
                }
            })
        }
        else {
            const newProduct = new Product(product);
            await newProduct.save();
            res.json({
                "status": "200",
                "product": newProduct,
                "ack": {
                    "isSuccessfull": true,
                    "message": "Product added successfully"
                }
            })
        }
    } catch (err) {
        res.status(400).json({ message: err });
    }
}

export const updateProduct = async (req, res) => {
    try {
        if (req.body.id === '') {
            res.json({
                "status": "200",
                "proudct fields": req.body,
                "ack": {
                    "isSuccessfull": false,
                    "message": "Required fields are missing. provide product id"
                }
            })
        }
        else {
            let product = await Product.findById(req.body.id);
            if (product) {
                if (valideProductUpdate(req) === false) {
                    res.json({
                        "status": "200",
                        "proudct fields": req.body,
                        "ack": {
                            "isSuccessfull": false,
                            "message": "Required fields are missing"
                        }
                    })
                }
                else {
                    product = await Product.findByIdAndUpdate(req.body.id, req.body, {
                        new: true,
                        runValidators: false,
                        useFindAndModify: false
                    });
                    res.json({
                        "status": "200",
                        "ack": {
                            "isSuccessfull": true,
                            "message": "Product updated successfully"
                        }
                    })
                }
            }
            else {
                res.json({
                    "status": "200",
                    "proudct fields": req.body,
                    "ack": {
                        "isSuccessfull": false,
                        "message": "Product not found"
                    }
                })
            }
        }
    }
    catch (error) {
        console.log(error);
        res.json({
            "status": "404",
            "ack": {
                "isSuccessfull": false,
                "message": error
            }
        })
    }
}

export const deleteProduct = async (req, res) => {
    try {
        const id = req.body.id;
        const product = await Product.findByIdAndDelete(id);
        if (product) {
            res.json({
                "status": "200",
                "ack": {
                    "isSuccessfull": true,
                    "message": "Product deleted successfully"
                }
            })
        }
        else {
            res.json({
                "status": "200",
                "ack": {
                    "isSuccessfull": false,
                    "message": "Product not found"
                }
            })
        }

    } catch (error) {
        res.json({
            "status": "404",
            "ack": {
                "isSuccessfull": false,
                "message": "Invalid Request data"
            }
        })
    }

}