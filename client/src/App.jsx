import React from "react";
import { MapView } from "./components/MapView.jsx";
import { MapContextProvider } from "./components/context/mapconext";
import {
	ModalMarker1,
	ModalMarker2,
	ModalPolygon1,
	ModalPolygon2,
} from "./components/ModalP.jsx";

function App() {
	return (
		<MapContextProvider>
			<MapView />
			<ModalMarker1 />
			<ModalMarker2 />
			<ModalPolygon1 />
			<ModalPolygon2 />
		</MapContextProvider>
	);
}

export default App;
