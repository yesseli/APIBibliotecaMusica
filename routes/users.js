const express = require ("express");
const router = express.Router();
const customHeader = require("../middleware/customHeader")
const {validatorGetItem, validatorCreateItem}=require("../validators/users")
const {getItems, getItem, createItem,  deleteItem}=require("../controllers/users");


/**obtener lista */
router.get("/",getItems)

/**detalle item */
router.get("/:id",validatorGetItem,getItem);

/**crear item */
router.post("/", validatorCreateItem, createItem);

/**eliminar un registro */

router.delete("/:id", validatorGetItem, deleteItem);

module.exports=router;