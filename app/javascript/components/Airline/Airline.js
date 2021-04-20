import React, { useState, useEffect, Fragment } from "react";
import axios from "axios";
import styled from "styled-components";
import Header from "./Header";

const Wrapper = styled.div`
	margin-left: auto;
	margin-right: auto;
`;

const Column = styled.div`
	background: #fff;
	max-width: 50%;
	width: 50%;
	float: left;
	height: 100vh;

	&:last-child {
		background: black;
		border-top: 1px solid rgba(255, 255, 255, 0.5);
	}
`;

const Main = styled.div`
	padding-left: 60px;
`;

const Airline = (props) => {
	const [airline, setAirline] = useState({});
	const [review, setReview] = useState({});
	const [loaded, setLoaded] = useState(false);

	useEffect(() => {
		const route = `/api/v1${props.location.pathname}`;
		axios
			.get(route)
			.then((response) => {
				setAirline(response.data);
				setLoaded(true);
			})
			.catch((err) => console.error(err));
	}, []);

	return (
		<Wrapper>
			{loaded && (
				<Fragment>
					<Column>
						<Main>
							<Header
								attributes={airline.data.attributes}
								reviews={airline.included}
							/>
						</Main>
					</Column>
					<Column>
						<div className="review-form" />
					</Column>
				</Fragment>
			)}
		</Wrapper>
	);
};

export default Airline;
