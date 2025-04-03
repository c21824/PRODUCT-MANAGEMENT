const mongoose = require('mongoose')
const slug = require("mongoose-slug-updater")
mongoose.plugin(slug);
const ProductSchema = new mongoose.Schema({
    title: String,
    description: String,
    price: Number,
    discountPercentage: Number,
    stock: Number,
    status: String,
    position: Number,
    slug:{
        type: String,
        unique: true,
        slug:"title"
    },
    thumbnail: String,
    delete: {
        type: Boolean,
        default: false
    },
    deletedAt: Date
}, {
    timestamps: true
})
const Product = mongoose.model('Product', ProductSchema, "Products")

module.exports = Product