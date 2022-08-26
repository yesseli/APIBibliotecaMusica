const express = require("express");
const router = express.Router();
const uploadMiddleware = require("../utils/handleStorage")
const {getItems, getItem, createItem, updateItem, deleteItem}=require("../controllers/storage");
const {validatorGetItem} = require("../validators/storage");

/**
 * Obtener lista de items
 */
router.get("/",getItems);

/**detalle item */
router.get("/:id",validatorGetItem,getItem);

/** crear item*/
router.post("/", uploadMiddleware.single("myfile"), createItem);

/**eliminar item */
router.delete("/:id", validatorGetItem,deleteItem);


module.exports = router;