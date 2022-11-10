const productModel = require("../models/product");
const mongoose = require('mongoose');


    const createProduct = (object) => {
        try {
            return productModel.create(object)
        } catch (error) {
            console.error(error);
            return false;
        }
    }

    // const existProduct = id => {
    //     try {
    //         return productModel.findById(id)
    //     } catch (error) {
    //         console.error(error);
    //         return false;
    //     }
    // }

    const getProduct = (id) => {
        try {
            return productModel.findById(id);
        } catch (error) {
            console.log(error);
        }
    }

    const getAll = () => {
        try {
            return productModel.find();
        } catch (error) {
            console.error(error);
            return false;
        }
    }

module.exports = { createProduct, getProduct, getAll };
