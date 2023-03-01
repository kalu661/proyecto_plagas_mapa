const express = require("express");
const router = express.Router();

let plagas_radioDB = "SELECT * FROM puntos_plagas";
const pg = require("pg");
const conString = "postgres://postgres:admin@localhost/postgis_33_sample";
/* GET home page. */
router.get("/", function (req, res, next) {
	res.render("index", { title: "Express" });
});

//° GET Postgres JSON data */
router.get("/data", function (req, res) {
	var client = new pg.Client(conString);
	client.connect();
	client.query(plagas_radioDB, [], (err, result) => {
		res.json(result.rows);
		res.end();
		client.end();
	});
});

//° POST Postgres JSON data

/* GET Tabla */
// router.get("/tabla", function (req, res) {
// 	const client = new pg.Client(conString);
// 	client.connect();
// 	const query = client.query(plagas_radioDB);
// 	client.query("row", function (row, result) {
// 		result.addRow(row);
// 	});
// 	client.query("end", function (result) {
// 		res.render("tabla", {
// 			title: "Tabla de datos",
// 			datos: result.rows[0].row_to_json.datos,
// 		});
// 	});
// });

module.exports = router;
