import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Home from "./Home";
import Admin from "./Admin";

const App = () => (
	<Router>
		<div className="pt-dark">
			<Route exact path="/" component={Home} />
			<Route path="/admin" component={Admin} />
		</div>
	</Router>
);

export default App;
