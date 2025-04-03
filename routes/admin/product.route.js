const express = require("express")
const router = express.Router()
const controller = require("../../controllers/admin/productcontroller")
const multer = require("multer")
const storageMulter = require("../../helpers/storageMulter")
const upload = multer({storage: storageMulter()})
const validate = require("../../validate/admin/product.validate")


router.get('/', controller.index)

router.patch('/change-status/:status/:title', controller.changeStatus)

router.patch('/change-multi', controller.changeMulti)

router.delete("/delete/:title", controller.deleteItem);

router.get("/create", controller.create);

// Use middleware
router.post("/create",validate.createPost ,upload.single("thumbnail"), controller.createPost)

router.get("/edit/:title", controller.edit)

router.patch("/edit/:title",validate.createPost ,upload.single("thumbnail"), controller.editPatch)

router.get("/detail/:title", controller.detail)

module.exports = router