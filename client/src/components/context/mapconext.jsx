import { createContext, useState, useEffect } from "react";

export const MapContext = createContext();

const initialState = {
	showModalMarker1: false,
	showModalPolygon1: false,
	showModalMarker2: false,
	showModalPolygon2: false,
	form: {
		Cultivo: "",
		Plaga: "",
		point: null,
		polygon: "",
	},
};

export const MapContextProvider = ({ children }) => {
	const [mapState, setMapState] = useState(initialState);

	const handleChange = (e) =>
		setMapState((prev) => ({
			...prev,
			form: { ...prev.form, [e.target.name]: e.target.value },
		}));
	const handleChangePoint = (latlgn) =>
		setMapState((prev) => ({
			...prev,
			form: { ...prev.form, point: latlgn },
		}));
	const handleChangePolygon = (latlgns) =>
		setMapState((prev) => ({
			...prev,
			form: { ...prev.form, polygon: latlgns },
		}));
	const sendDataForm = async () => {
		// console.log("body", mapState.form);

		// return await fetch("http://localhost:8080/test", {
		// 	method: "POST",
		// 	body: "asdadsdasdas",
		// });

		const response = await fetch("http://localhost:5200/test", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			mode: "cors",
			body: JSON.stringify(mapState.form),
		});

		console.log(response);
		alert(response);
	};
	useEffect(() => {
		console.log(mapState.form);
	}, [mapState.form]);

	return (
		<MapContext.Provider
			value={{
				mapState,
				setMapState,
				handleChange,
				handleChangePoint,
				handleChangePolygon,
				sendDataForm,
			}}
		>
			{children}
		</MapContext.Provider>
	);
};
