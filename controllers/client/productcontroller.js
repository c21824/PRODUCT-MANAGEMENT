// [GET] /products

const Product = require('../../models/product.model')
module.exports.index =  async(req, res) => {
    const products = await Product.find({
        status: "active",
        delete: false
    })
    const newProducts = products.map(item=>{
        item.priceNew = (item.price - item.price*item.discountPercentage).toFixed(0)
        return item
    })
    res.render("client/pages/products/index", {
        pageTitle: "DS san pham",
        products: newProducts
    })
}

module.exports.detail =  async(req, res) => {
    try{
        const find = {
            delete: false,
            title: req.params.title
        }
        const product = await Product.findOne(find);
        console.log(product)
        res.render("client/pages/products/detail", {
            pageTitle: product.title,
            product: product
        });
    }
    catch(error){
        req.flash("error", "khong ton tai san pham nay")
        res.redirect(`/products`)
    }
}

