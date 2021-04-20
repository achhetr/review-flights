import React, { useState, useEffect, Fragment } from "react";
import axios from "axios";
import Airline from "./Airline";

const Airlines = () => {
	const [airlines, setAirlines] = useState([]);

	useEffect(() => {
		axios
			.get("/api/v1/airlines.json")
			.then((response) => {
				setAirlines(response.data.data);
			})
			.catch((err) => console.error(err));
	}, [airlines.length]);

	const grid = airlines.map((item) => {
		return (
			<Airline
				key={item.attributes.slug}
				attributes={item.attributes}
			></Airline>
		);
	});

	return (
		<div className="home">
			<div className="header">
				<h1>Review Flights</h1>
				<div className="subheader">Honest review by the passengers</div>
			</div>
			<div className="grid">
				<ul>{grid}</ul>
			</div>
		</div>
	);
};

export default Airlines;
