import React from "react";
import PropTypes from "prop-types";
import axios from "axios";

class RatingSelect extends React.Component {
	constructor(props) {
		super(props);
		this.state = this.getInitialState();
	}

	getInitialState() {
		return {
			ratings: [],
		};
	}

	componentDidMount() {
		this.mounted = true;
		this.fetchRatings();
	}

	componentWillUnmount() {
		this.mounted = false;
	}

	async fetchRatings() {
		try {
			const response = await axios.get("/api/ratings/");
			const ratings = response.data;
			if (this.mounted) {
				this.setState({ ratings });
			}
		} catch (error) {
			console.error(error);
		}
	}

	renderOptions() {
		const options = this.state.ratings.map(rating => (
			<option key={rating.id} value={rating.id}>
				{rating.value}
			</option>
		));
		options.unshift(
			<option key="non-defined" value={""}>
				Select rating
			</option>,
		);
		return options;
	}

	render() {
		return (
			<div className="form-group">
				<select
					className="custom-select bg-secondary text-white"
					value={this.props.value || ""}
					onChange={event => {
						this.props.onChange(Number(event.target.value) || null);
					}}
				>
					{this.renderOptions()}
				</select>
			</div>
		);
	}
}

RatingSelect.propTypes = {
	value: PropTypes.number,
	onChange: PropTypes.func.isRequired,
};

export default RatingSelect;
