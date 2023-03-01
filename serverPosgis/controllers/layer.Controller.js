//° Mediante la función require llamamos a los módulos que vamos a usar y los almacenamos en variables
const Pool = require("pg").Pool;
const GeoJSON = require("geojson");

//°  Recuperamos los datos de config.js y los pasamos a variables
const config = require("../config/config");
const {
	db: { user, host, database, password, port },
} = config;

//° Usando el objeto Pool del módulo pg  instanciamos un nuevo objeto que usará las credenciales definidas.
const pool = new Pool({
	user: user,
	host: host,
	database: database,
	password: password,
	port: port,
});

// Almacenamos en una constante la función que realiza la llamada y devuelve el archivo.
const getGeojson = (req, res, next) => {
	// Almacenamos la consulta SQL
	let queryLayer = "SELECT  FROM  punto";

	pool.query(queryLayer, (err, res) => {
		if (err) {
			return console.error("Error ejecutando la consulta. ", err.stack);
		}
		let geojson = GeoJSON.parse(res.rows, { Point: ["lat", "lng"] });

		res.json(geojson);
	});
};

// Exportamos las funciones para ser usadas dentro de la aplicación
module.exports = { getGeojson };
