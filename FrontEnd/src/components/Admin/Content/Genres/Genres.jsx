import React from "react";
import axios from "axios";

import GenreForm from "./GenreForm";
import GenreCard from "./GenreCard";

class Genres extends React.Component {
	constructor(props) {
		super(props);
		this.state = this.getInitialState();
	}

	getInitialState() {
		return {
			error: false,
			errors: {},
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
			if (this.mounted) {
				this.setState({ error: true });
			}
		}
	}

	async removeGenre(id) {
		try {
			await axios.delete(`/api/genres/${id}`);
			this.fetchGenres();
		} catch (error) {
			const errors = { [id]: error.response.data.exception };
			if (this.mounted) {
				this.setState({ errors });
			}
		}
	}

	dismissError(id) {
		const errors = { ...this.state.errors, [id]: null };
		this.setState({ errors });
	}

	renderGenres() {
		return this.state.genres.map(genre => {
			const { id } = genre;
			const invalid = this.state.errors[id];

			return (
				<GenreCard
					key={id}
					genre={genre}
					invalid={invalid}
					removeGenre={() => this.removeGenre(id)}
					dismissError={() => this.dismissError(id)}
					onEditSuccess={() => {
						this.fetchGenres();
					}}
				/>
			);
		});
	}

	renderGenreForm() {
		return (
			<GenreForm
				onSave={async () => {
					await this.fetchGenres();
				}}
			/>
		);
	}

	render() {
		if (this.state.error) {
			return (
				<div className="alert alert-danger">
					500 - Internal Server Error
				</div>
			);
		}

		if (!this.state.genres) return null;

		return (
			<div>
				<div className="row">
					{this.renderGenres()}
					{this.renderGenreForm()}
				</div>
			</div>
		);
	}
}

export default Genres;
