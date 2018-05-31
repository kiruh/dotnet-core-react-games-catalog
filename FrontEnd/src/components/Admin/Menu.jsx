import React from "react";
import { NavLink } from "react-router-dom";

class Menu extends React.Component {
	render() {
		return (
			<ul className="nav nav-pills">
				<li className="nav-item">
					<NavLink
						className="nav-link"
						activeClassName="active show"
						to="/admin"
						exact
					>
						Games
					</NavLink>
				</li>
				<li className="nav-item">
					<NavLink
						className="nav-link"
						activeClassName="active show"
						to="/admin/genres"
					>
						Genres
					</NavLink>
				</li>
				<li className="nav-item">
					<NavLink
						className="nav-link"
						activeClassName="active show"
						to="/admin/ratings"
					>
						Ratings
					</NavLink>
				</li>
			</ul>
		);
	}
}

export default Menu;
