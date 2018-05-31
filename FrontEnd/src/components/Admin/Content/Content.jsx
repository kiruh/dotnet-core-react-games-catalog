import React from "react";
import { Route } from "react-router-dom";

import Genres from "./Genres";
import Ratings from "./Ratings";
import Games from "./Games";

class Content extends React.Component {
	render() {
		return (
			<div>
				<Route path="/admin/games" component={Games} />
				<Route path="/admin/genres" component={Genres} />
				<Route path="/admin/ratings" component={Ratings} />
			</div>
		);
	}
}

export default Content;
