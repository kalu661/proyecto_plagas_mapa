import React, { useState, useContext } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";

import { MapContext } from "./context/mapconext";

export const ModalMarker1 = () => {
	const { mapState, setMapState, handleChange, sendDataForm } =
		useContext(MapContext);

	const handleClose = () =>
		setMapState((prev) => ({ ...prev, showModalMarker1: false }));

	return (
		<Modal show={mapState.showModalMarker1} onHide={handleClose}>
			<Modal.Header closeButton>
				<Modal.Title>Generar una alerta de plaga</Modal.Title>
				<p></p>
			</Modal.Header>
			<Modal.Body>
				<div
					className='custom-select'
					id='_select_plag'
					style={{ width: "70%" }}
				>
					<select
						className='form-select mb-2'
						aria-label='Default select example'
						name='Cultivo'
						onChange={handleChange}
					>
						<option value='0'>Seleccione el cultivo:</option>
						<option value='1'>Algodon</option>
						<option value='2'>Maiz</option>
						<option value='3'>Mandioca</option>
						<option value='4'>Zapallito</option>
					</select>
				</div>
				<div
					className='custom-select'
					id='_select_plag'
					style={{ width: "70%" }}
				>
					<select
						className='form-select mb-2'
						aria-label='Default select example'
						name='Plaga'
						onChange={handleChange}
					>
						<option value='0'>Seleccione la plaga:</option>
						<option value='1'>Picudo del algodonero</option>
						<option value='2'>Orugas</option>
						<option value='3'>Araña roja</option>
						<option value='4'>Pulgones</option>
						<option value='5'>Cochinilla algodonosa</option>
						<option value='6'>Lapilla</option>
						<option value='7'>Gusano gris</option>
						<option value='8'>Trips</option>
					</select>
				</div>
			</Modal.Body>
			<Modal.Footer>
				<Button variant='danger' onClick={handleClose}>
					Cerrar
				</Button>
				<Button
					variant='success'
					onClick={() => {
						handleClose();
						sendDataForm();
					}}
				>
					Guardar
				</Button>
			</Modal.Footer>
		</Modal>
	);
};

export const ModalMarker2 = () => {
	const { mapState, setMapState, handleChange, sendDataForm } =
		useContext(MapContext);

	const handleClose = () =>
		setMapState((prev) => ({ ...prev, showModalMarker2: false }));

	return (
		<Modal show={mapState.showModalMarker2} onHide={handleClose}>
			<Modal.Header closeButton>
				<Modal.Title>Informacion sobre la alerta</Modal.Title>
			</Modal.Header>
			<Modal.Footer>
				<Button variant='danger' onClick={handleClose}>
					Cerrar
				</Button>
				<Button
					variant='success'
					onClick={() => {
						handleClose();
						sendDataForm();
					}}
				>
					Guardar
				</Button>
			</Modal.Footer>
		</Modal>
	);
};

export const ModalPolygon1 = () => {
	const { mapState, setMapState } = useContext(MapContext);

	const handleClose = () =>
		setMapState((prev) => ({ ...prev, showModalPolygon1: false }));

	return (
		<Modal show={mapState.showModalPolygon1} onHide={handleClose}>
			<Modal.Header closeButton>
				<Modal.Title>Nombre de la parcela</Modal.Title>
			</Modal.Header>
			<Modal.Body>
				<textarea
					type='text'
					placeholder='Ejemplo: Campo Armando 01'
				></textarea>
			</Modal.Body>
			<Modal.Footer>
				<Button variant='danger' onClick={handleClose}>
					Cerrar
				</Button>
				<Button
					variant='success'
					onClick={() => {
						handleClose();
						sendDataForm();
					}}
				>
					Guardar
				</Button>
			</Modal.Footer>
		</Modal>
	);
};

export const ModalPolygon2 = () => {
	const { mapState, setMapState, handleChange, sendDataForm } =
		useContext(MapContext);

	const handleClose = () =>
		setMapState((prev) => ({ ...prev, showModalPolygon2: false }));
	return (
		<Modal show={mapState.showModalPolygon2} onHide={handleClose}>
			<Modal.Header closeButton>
				<Modal.Title>Informacion de la parcela</Modal.Title>
			</Modal.Header>
			<Modal.Body></Modal.Body>
			<Modal.Footer>
				<Button variant='danger' onClick={handleClose}>
					Cerrar
				</Button>
				<Button
					variant='success'
					onClick={() => {
						handleClose();
						sendDataForm();
					}}
				>
					Guardar
				</Button>
			</Modal.Footer>
		</Modal>
	);
};
