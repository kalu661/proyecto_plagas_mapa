import React from "react";
import { useState, useContext } from "react";
import {
	LayersControl,
	TileLayer,
	Marker,
	Popup,
	Circle,
	LayerGroup,
	FeatureGroup,
	WMSTileLayer,
} from "react-leaflet";
import { Parcela001, ParcelaJ, Cultivos02 } from "../ParcelaJSON";
import { EditControl } from "react-leaflet-draw";

import { MapContext } from "../context/mapconext";

const LayerMap = () => {
	return (
		<LayersControl position='bottomleft'>
			<LayersControl.BaseLayer name='Predeterminado'>
				<TileLayer
					attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
					url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
				/>
			</LayersControl.BaseLayer>
			<LayersControl.BaseLayer name='Satelite'>
				<TileLayer
					url='https://{s}.google.com/vt/lyrs=s&x={x}&y={y}&z={z}'
					maxZoom={20}
					subdomains={["mt1", "mt2", "mt3"]}
				/>
			</LayersControl.BaseLayer>
		</LayersControl>
	);
};

const LayerMap2 = () => {
	const position = [-24.559, -60.403];
	return (
		<LayersControl position='topright'>
			<LayersControl.Overlay name='Parcelas'>
				<WMSTileLayer
					layers={"parcelas_plagas:parcelas_geo"}
					url={`http://localhost:5200/geoserver/parcelas_plagas/wms?`}
					transparent={false}
					format='image/svg'
				/>
			</LayersControl.Overlay>
			<LayersControl.Overlay name='Plagas'>
				<WMSTileLayer
					layers={"puntos_plagas:puntos_plagas"}
					url={`http://localhost:5200/geoserver/puntos_plagas/wms?`}
					transparent={false}
					format='image/svg'
				/>
			</LayersControl.Overlay>
		</LayersControl>
	);
};

const ControlEd = () => {
	const { setMapState, handleChangePoint, handleChangePolygon } =
		useContext(MapContext);

	const [editableLayers, setEditableLayers] = useState();

	// Constatnte para el control de edicion
	const _onCreated = (e) => {
		const showModalMarker = () =>
			setMapState((prev) => ({ ...prev, showModalMarker1: true }));

		const showModalMarker2 = () =>
			setMapState((prev) => ({ ...prev, showModalMarker2: true }));

		const showModalPolygon1 = () =>
			setMapState((prev) => ({ ...prev, showModalPolygon1: true }));

		const showModalPolygon2 = () =>
			setMapState((prev) => ({ ...prev, showModalPolygon2: true }));

		const type = e.layerType;
		const layer = e.layer;

		if (type === "marker") {
			console.log(layer._latlng);
			handleChangePoint(layer._latlng);
			showModalMarker();
		}
		if (type === "polygon") {
			console.log(layer._latlng);
			handleChangePolygon(layer._latlngs);
			showModalPolygon1();
		}
		setEditableLayers((layers) => {
			return {
				...layers,
				[layer._leaflet_id]: layer,
			};
		});
	};
	// Constante para editar los Layers
	const _onEdited = (e) => {
		const layers = e.layers;
		layers.eachLayer((layer) => {
			console.log("Editar Poligonos", layer);
		});
	};
	// Constante para eliminar poligonos
	const _onDeleted = (e) => {
		const layers = e.layers;
		layers.eachLayer((layer) => {
			console.log("Eliminar Poligonos", layer);
		});
	};

	return (
		<FeatureGroup>
			<EditControl
				position='bottomright'
				onEdited={_onEdited}
				onCreated={_onCreated}
				onDeleted={_onDeleted}
				draw={{
					polyline: true,
					polygon: {
						Popup: "",
						shapeOptions: {
							color: "green",
							weight: 5,
						},
						allowIntersection: true,
						showArea: true,
					},
					circle: false,
					rectangle: false,
					marker: {
						Popup: "",
						icon: L.icon({
							iconUrl:
								"https://cdn.rawgit.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-red.png",
							shadowUrl:
								"https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png",
							iconSize: [25, 41],
							iconAnchor: [12, 41],
							popupAnchor: [1, -34],
							shadowSize: [41, 41],
						}),
					},
				}}
			/>
		</FeatureGroup>
	);
};

export { LayerMap, LayerMap2, ControlEd };
