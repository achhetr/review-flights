import React, { useState, useEffect, Fragment } from "react";
import axios from "axios";
import styled from "styled-components";
import Header from "./Header";
import ReviewForm from "./ReviewForm";

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

	const handleChange = (evt) => {
		evt.preventDefault();
		const { name, value } = evt.target;
		setReview({ ...review, [name]: value });
	};

	const handleSubmit = (evt) => {
		evt.preventDefault();

		const csrfToken = document.querySelector("[name=csrf-token]").content;
		axios.defaults.headers.common["X-CSRF-TOKEN"] = csrfToken;

		const airlineId = airline.data.id;
		axios
			.post("/api/v1/reviews", { review, airline_id: airlineId })
			.then((response) => {
				const included = [...airline.included, response.data];
				setAirline({ ...airline, included });
				setReview({ title: "", description: "", score: 0 });
			})
			.catch((err) => console.log(err));
	};

	const setRating = (score, evt) => {
		evt.preventDefault();
		setReview({ ...review, score });
	};

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
						<ReviewForm
							handleChange={handleChange}
							handleSubmit={handleSubmit}
							attributes={airline.data.attributes}
							review={review}
							setRating={setRating}
						/>
					</Column>
				</Fragment>
			)}
		</Wrapper>
	);
};

export default Airline;
