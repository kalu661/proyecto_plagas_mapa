import React, { Component } from "react";
import { MapContainer, TileLayer, GeoJSON } from "react-leaflet";
import Parcela from "../components/data/Parcelas.json";
import Parcela1 from "../components/data/Parcelas001.json";
import Cultivos from "../components/data/Cultivos02.json";

const ParcelaJ = () => {
	const position = [-24.559, -60.403];
	return <GeoJSON data={Parcela} center={position} />;
};

const Parcela001 = () => {
	return <GeoJSON data={Parcela1} />;
};

const Cultivos02 = () => {
	return <GeoJSON data={Cultivos} />;
};

export { ParcelaJ, Parcela001, Cultivos02 };
