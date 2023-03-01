const { Router } = require("express");
const router = Router();
const {
	postParcelas,
	getAllParcelas,
	getParcelas,
	putParcelas,
	deleteParcelas,
} = require("../controllers/parcelas.controllers");

router.post("/", postParcelas);

// router.get("/", getAllParcelas);

// router.get("/:id", getParcelas);

// router.put("/:id", putParcelas);

// router.delete("/:id", deleteParcelas);

module.exports = router;
