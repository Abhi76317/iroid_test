const express = require("express");
const router = express.Router();
const category = require("../controler/category")

router.post("/category/add", category.addCategory)
router.patch("/category/update/:id", category.editCategory)
router.delete("/category/delete/:id", category.deleteCategory)

module.exports = router;