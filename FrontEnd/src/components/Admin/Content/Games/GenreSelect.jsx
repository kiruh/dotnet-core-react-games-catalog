import React from "react";
import PropTypes from "prop-types";
import axios from "axios";

class GenreSelect extends React.Component {
	constructor(props) {
		super(props);
		this.state = this.getInitialState();
	}

	getInitialState() {
		return {
			genres: [],
		};
	}

	componentDidMount() {
		this.mounted = true;
		this.fetchGenres();
	}

	componentWillUnmount() {
		this.mounted = false;
	}

	async fetchGenres() {
		try {
			const response = await axios.get("/api/genres/");
			const genres = response.data;
			if (this.mounted) {
				this.setState({ genres });
			}
		} catch (error) {
			console.error(error);
		}
	}

	renderOptions() {
		const options = this.state.genres.map(genre => (
			<option key={genre.id} value={genre.id}>
				{genre.name}
			</option>
		));
		options.unshift(
			<option key="non-defined" value={""}>
				Select genre
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

GenreSelect.propTypes = {
	value: PropTypes.number,
	onChange: PropTypes.func.isRequired,
};

export default GenreSelect;
