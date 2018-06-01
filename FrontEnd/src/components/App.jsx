import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";

import Home from "./Home";
import Admin from "./Admin";
import Spinner from "./Spinner";
import Navbar from "./Navbar";
import Login from "./Login";

class App extends React.Component {
	constructor(props) {
		super(props);
		this.state = { loading: true };
	}

	componentDidMount() {
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
		}, 0);
	}

	render() {
		if (this.state.loading) {
			return <Spinner />;
		}

		return (
			<Router>
				<div>
					<Navbar
						onLogout={() => {
							this.setState({});
						}}
					/>
					<div className="app">
						<Route exact path="/" component={Home} />
						<Route path="/admin" component={Admin} />
						<Route path="/login" component={Login} />
					</div>
				</div>
			</Router>
		);
	}
}

export default App;
