const Product = require("../../models/product.model")

const systemConfig = require("../../config/system")

const filterStatusHelper = require("../../helpers/filterStatus")
const searchHelper = require("../../helpers/search")
const paginationHelper = require("../../helpers/pagination")
const { default: mongoose } = require("mongoose")

// [GET] /admin/products
module.exports.index = async (req, res) => {

    const filterStatus = filterStatusHelper(req.query)

    let find = {
        delete: false,
    }
    if(req.query.status){
        find.status = req.query.status
    }

    const objectSearch = searchHelper(req.query)
    if(objectSearch.regex){
        find.title = objectSearch.regex;
    }

    // Pagination
    const countProducts = await Product.countDocuments(find)

    let objectPagination = paginationHelper(
        {
        limitItems: 3,
        currentPage:1
        },
        req.query,
        countProducts
    )
    // End pagination
    
    const products = await Product.find(find).sort({position: "desc"}).limit(objectPagination.limitItems).skip(objectPagination.skip);
    res.render("admin/pages/products/index.pug", {
        pageTitle: "Trang san pham",
        products: products,
        filterStatus: filterStatus,
        keyword: objectSearch.keyword,
        pagination: objectPagination
    });

    
}

// [PATCH] /admin/products/change-status/:status/:id
module.exports.changeStatus = async(req, res)=>{
    const status = req.params.status
    const title = req.params.title
    const result = await Product.updateOne(
        { title: title }, // Điều kiện tìm sản phẩm
        { status: status } // Cập nhật giá trị mới
    );
    req.flash("success", `Cap nhat trang thai san pham thanh cong`)
    res.redirect("back")
}

// [PATCH] /admin/products/change-multi/
module.exports.changeMulti = async(req, res)=>{
    const type = req.body.type
    const titles = req.body.titles.split(", ")
    if(type == "active"){
        await Product.updateMany({title: {$in: titles}}, {status: "active"})
        req.flash("success", `Cap nhat trang thai san pham thanh cong cua ${titles.length} san pham`)
    }
    else if(type == "inactive"){
        await Product.updateMany({title: {$in: titles}}, {status: "inactive"})
        req.flash("success", `Cap nhat trang thai san pham thanh cong cua ${titles.length} san pham`)
    }
    else if(type == "delete-all"){
        await Product.updateMany({title: {$in: titles}},
            {   
                delete: true,
                deletedAt: new Date()
            }
        )
        req.flash("success", `Xoa ${titles.length} san pham thanh cong`)
    }
    else if(type == "change-position"){
        for(let item of titles){
           let [title, position] = item.split("-")
           position = parseInt(position)
           await Product.updateOne({title: title}, {position: position}) 
        }
        req.flash("success", `Thay doi vi tri san pham thanh cong`)
    }
    res.redirect("back")
}

// [DELETE] /admin/products/delete/:title
module.exports.deleteItem = async(req, res)=>{
    const title = req.params.title
    // const id = req.params.id
    // const objectId = new mongoose.Types.ObjectId(id);
    console.log(title)
    const result = await Product.updateOne(
        {title: title},
        {   delete: true,
            deletedAt: new Date()
        }
    );
    req.flash("success", `Xoa san pham thanh cong`)
    res.redirect("back")
}

// [GET] /admin/products/create
module.exports.create = async (req, res) => {
    res.render("admin/pages/products/create.pug", {
        pageTitle: "Trang them moi san pham",
    });
}

// [POST] /admin/products/create
module.exports.createPost = async (req, res) => {

    req.body.price = parseInt(req.body.price)
    req.body.discountPercentage = parseInt(req.body.discountPercentage)
    req.body.stock = parseInt(req.body.stock)
    if(req.body.position===""){
        const countProducts = await Product.estimatedDocumentCount();
        req.body.position = countProducts+1
    }
    else{
        req.body.position = parseInt(req.body.position)
    }
    if(req.file){
        req.body.thumbnail = `/uploads/${req.file.filename}`;     
    }

    const product = new Product(req.body)
    await product.save();
    
    res.redirect(`${systemConfig.prefixAdmin}/products`)
}

// [GET] /admin/products/edit/title
module.exports.edit = async (req, res) => {
    try{
        const find = {
            delete: false,
            title: req.params.title
        }
        const product = await Product.findOne(find);
        console.log(product)
        res.render("admin/pages/products/edit.pug", {
            pageTitle: "Trang Sua san pham",
            product: product
        });
    }
    catch(error){
        req.flash("error", "khong ton tai san pham nay")
        res.redirect(`${systemConfig.prefixAdmin}/products`)
    }
}

module.exports.editPatch = async (req, res) => {
    req.body.price = parseInt(req.body.price)
    req.body.discountPercentage = parseInt(req.body.discountPercentage)
    req.body.stock = parseInt(req.body.stock)
    req.body.position = parseInt(req.body.position)
    if(req.file){
        req.body.thumbnail = `/uploads/${req.file.filename}`;     
    }
    try{
        await Product.updateOne({title: req.params.title}, req.body);
        req.flash("success", `Cap nhat san pham thanh cong`)
    }
    catch(error){
        req.flash("error", `Cap nhat san pham khong thanh cong`)
    }

    res.redirect(`back`)
}

// [GET] /admin/products/detail/title
module.exports.detail = async (req, res) => {
    try{
        const find = {
            delete: false,
            title: req.params.title,
            status:"active"
        }
        const product = await Product.findOne(find);
        console.log(product)
        res.render("admin/pages/products/detail.pug", {
            pageTitle: "Chi tiet san pham",
            product: product
        });
    }
    catch(error){
        req.flash("error", "khong ton tai san pham nay")
        res.redirect(`${systemConfig.prefixAdmin}/products`)
    }
}