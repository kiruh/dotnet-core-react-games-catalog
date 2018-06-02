import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";

import Home from "./Home";
import Admin from "./Admin";
import Spinner from "./Spinner";
import Navbar from "./Navbar";
import Login from "./Login";
import Register from "./Register";
import { getUser } from "~/actions/controller";

class App extends React.Component {
	constructor(props) {
		super(props);
		this.state = { loading: true };
	}

	componentDidMount() {
		getUser();
		this.hideSpinner();
		this.mounted = true;
	}

	componentWillUnmount() {
		this.mounted = false;
	}

	hideSpinner() {
		setTimeout(() => {
			if (this.mounted) {
				this.setState({ loading: false });
			}
		}, 1500);
	}

	render() {
		if (this.state.loading) {
			return <Spinner />;
		}

		return (
			<Router>
				<div>
					<Navbar />
					<div className="app">
						<Route exact path="/" component={Home} />
						<Route path="/admin" component={Admin} />
						<Route path="/login" component={Login} />
						<Route path="/register" component={Register} />
					</div>
				</div>
			</Router>
		);
	}
}

export default App;
