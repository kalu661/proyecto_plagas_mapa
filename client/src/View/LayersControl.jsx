import React from "react";
import { useState } from "react";
import {
	LayersControl,
	TileLayer,
	Marker,
	Popup,
	Circle,
	LayerGroup,
	FeatureGroup,
} from "react-leaflet";
import { Parcela001, ParcelaJ, Cultivos02 } from "../ParcelaJSON";
import { EditControl } from "react-leaflet-draw";
import { WMSTileLayer } from "react-leaflet";

const LayerMap = () => {
	return (
		<LayersControl position='bottomleft'>
			<LayersControl.BaseLayer name='Predeterminado'>
				{/* <TileLayer url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png' /> */}
				<TileLayer
					url='http://localhost:5200/geoserver/puntos_plagas/wms?'
					version='2.20.1'
					opacity={1}
					layers={"puntos_plagas:punto"}
					srs='EPSG:4326'
				/>
			</LayersControl.BaseLayer>
			<LayersControl.BaseLayer name='Satelite'>
				<TileLayer
					url='https://{s}.google.com/vt/lyrs=s&x={x}&y={y}&z={z}'
					maxZoom={20}
					subdomains={["mt1", "mt2", "mt3"]}
				/>
			</LayersControl.BaseLayer>
			<LayersControl.BaseLayer name='Puntogeosv'>
				<TileLayer
					attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
					url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
				/>

				<TileLayer
					url='http://localhost:5200/geoserver/puntos_plagas/wms?'
					version='2.20.1'
					opacity={1}
					layers={"puntos_plagas:punto"}
					srs='EPSG:4326'
				/>
			</LayersControl.BaseLayer>
		</LayersControl>
	);
};

const LayerMap2 = () => {
	const position = [-24.559, -60.403];
	return (
		<LayersControl position='topright'>
			<LayersControl.Overlay name='Marcadores'>
				<Marker position={position}>
					<Popup>
						Provincia de Formosa <br />
						{position}
					</Popup>
				</Marker>
			</LayersControl.Overlay>
			<LayersControl.Overlay name='Atlantico'>
				<Parcela001 />
			</LayersControl.Overlay>
			<LayersControl.Overlay name='ultivos'>
				<Cultivos02 />
			</LayersControl.Overlay>
			<LayersControl.Overlay name='Nigeria'>
				<ParcelaJ />
			</LayersControl.Overlay>
			<LayersControl.Overlay name='Formosa'>
				<LayerGroup>
					<Circle
						center={position}
						pathOptions={{ fillColor: "blue" }}
						radius={50000}
					/>
					<LayerGroup>
						<Circle
							center={position}
							pathOptions={{ fillColor: "red" }}
							radius={10000}
							stroke={true}
						/>
					</LayerGroup>
				</LayerGroup>
			</LayersControl.Overlay>
		</LayersControl>
	);
};

const ControlEd = () => {
	const [editableLayers, setEditableLayers] = useState();

	// Constatnte para el control de edicion
	const _onCreated = (e) => {
		const type = e.layerType;
		const layer = e.layer;
		if (type === "marker") {
			layer.bindPopup(
				<Button
					label='Example'
					className='p-button-rounded'
					onClick={() => {
						console.log("Button pressed");
					}}
				/>
			);
		}
		if (type === "polygon") {
			layer.bindPopup(prompt("Contenido del Poligono:"));
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
			//do whatever you want; most likely save back to db
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
					polyline: false,
					polygon: {
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
