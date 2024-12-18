const express = require("express");
const readNotes  = require("../utils/fileHandler"); 
const { getNotes, getItemById , createItem, deleteItem, updateItem } = require("../controllers/itemsController");
const router = express.Router();

router.get("/", getNotes);

router.get("/:id", getItemById);

router.post("/", createItem);

router.delete("/delete/:id", deleteItem);

router.put("/update/:id", updateItem);

module.exports = router;
