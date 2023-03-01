const model = {};
model.Parcelas = pg.define("Parcelas", {
	id: {
		type: DataTypes.INTEGER,
		primaryKey: true,
		autoIncrement: true,
		unique: true,
	},
	parcela: {
		type: DataTypes.GEOMETRY("POLYGON"),
	},
	nombreParcela: {
		type: DataTypes.STRING(10),
	},
});
