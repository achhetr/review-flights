import React from "react";
import { BrowserRouter as Router, Link } from "react-router-dom";

const Airline = ({ name, image_url, average_score, slug, ...props }) => {
	console.log(props.attributes);
	return (
		<div className="card">
			<div className="airline-logo">
				<img src={props.attributes.image_url} alt={props.attributes.name} />
			</div>
			<div className="airline-name">{props.attributes.name}</div>
			<div className="airline-score">{props.attributes.avg_score}</div>
			<div className="airline-link">
				<Link to={`/airlines/${props.attributes.slug}`}>View Airline</Link>
			</div>
		</div>
	);
};

export default Airline;
