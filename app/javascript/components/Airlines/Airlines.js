import React, { useState, useEffect, Fragment } from "react";
import axios from "axios";
import styled from "styled-components";
import Airline from "./Airline";

const Home = styled.div`
	text-align: center;
	margin-left: auto;
	margin-right: auto;
	max-width: 1200px;
`;

const Grid = styled.div`
	display: grid;
	grid-template-columns: repeat(4, 1fr);
	grid-gap: 20px;
	width: 100%;
	padding: 20px;
	> div {
		background-color: #fff;
		border-radius: 5px;
		padding: 20px;
	}
`;
const Header = styled.div`
	padding: 100px 100px 10px 100px;

	h1 {
		font-size: 42px;
	}
`;

const Subheader = styled.p`
	font-weight: 300;
	font-size: 26px;
`;

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
		<Home>
			<Header>
				<h1>Review Flights</h1>
				<Subheader>Honest review by the passengers</Subheader>
			</Header>
			<Grid>{grid}</Grid>
		</Home>
	);
};

export default Airlines;
