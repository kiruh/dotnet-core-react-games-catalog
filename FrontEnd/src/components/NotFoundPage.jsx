import React from "react";
import { Link } from "react-router-dom";

const NotFoundPage = () => (
	<div className="jumbotron">
		<h1 className="display-3">404</h1>
		<p className="lead">Page not found</p>
		<Link className="btn btn-primary btn-lg" to="/">
			Home page
		</Link>
	</div>
);

export default NotFoundPage;
