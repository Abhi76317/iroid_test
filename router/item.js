const express = require("express");
const router = express.Router();
const item = require("../controler/item")

router.post("/item/add", item.addItem)

router.patch("/item/update/:id", item.editItem)

router.delete("/item/delete/:id", item.deleteItem)

router.get("/item/search/:data", item.searchItem)

module.exports = router;