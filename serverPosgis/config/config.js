//° config.js

//° Creamos un objeto con los parámetros de conexión. Los datos deben corresponder con los de nuestra base de datos.
const config = {
	db: {
		host: "127.0.0.1",
		user: "postgres",
		password: "admin",
		database: "Plagas_Map",
		port: 5432,
	},
};

//° Usamos este objeto para que el código sea accesible desde cualquier parte de nuestra aplicación
module.exports = config;
