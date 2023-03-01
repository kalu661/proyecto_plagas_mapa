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

const postParcelas = async (req, res, next) => {
	try {
		const { Nombre_parcelas, Parcelas } = req.body;

		const newPost = await pool.query(
			"INSERT INTO post ( Nombre_parcelas, Parcelas ) VALUES($1, $2) RETURNING *",
			[Nombre_parcelas, Parcelas]
		);

		res.json(newPost.rows[0]);
	} catch (error) {
		next(error);
	}
};

module.exports = { postParcelas };
