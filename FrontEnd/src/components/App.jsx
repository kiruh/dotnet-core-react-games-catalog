import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Home from "./Home";
import Admin from "./Admin";
import Spinner from "./Spinner";

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
		}, 1500);
	}

	render() {
		if (this.state.loading) {
			return <Spinner />;
		}

		return (
			<Router>
				<div>
					<Route exact path="/" component={Home} />
					<Route path="/admin" component={Admin} />
				</div>
			</Router>
		);
	}
}

export default App;
