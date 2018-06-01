import React from "react";
import axios from "axios";

import Paginator from "~/components/Paginator";
import GameCard from "~/components/GameComponents/GameCard";
import RatingSelect from "~/components/RatingSelect";
import GenreSelect from "~/components/GenreSelect";

class Home extends React.Component {
	constructor(props) {
		super(props);
		this.state = this.getInitialState();
	}

	getInitialState() {
		return {
			error: false,
			createGame: false,
			page: 1,
			totalPages: 1,
			ratingId: null,
			genreId: null,
			name: "",
		};
	}

	componentDidMount() {
		this.mounted = true;
		this.fetchGames();
	}

	componentWillUnmount() {
		this.mounted = false;
	}

	async onFilterChange(value, field) {
		await this.setState({
			[field]: value,
			page: 1,
		});
		this.fetchGames();
	}

	async onNameChange(value) {
		if (this.nameInputDelay) {
			clearTimeout(this.nameInputDelay);
		}
		this.setState({
			name: value,
			page: 1,
		});
		this.nameInputDelay = setTimeout(() => {
			this.fetchGames();
		}, 300);
	}

	async fixPages() {
		const { page, totalPages } = this.state;

		if (page > totalPages && this.mounted) {
			await this.setState({ page: totalPages });
			this.fetchGames();
		}
	}

	async fetchGames() {
		try {
			const { ratingId, genreId, page, name } = this.state;
			const response = await axios.get(`/api/games/paginate/${page}`, {
				params: {
					ratingId,
					genreId,
					name,
				},
			});
			const { games, totalPages } = response.data;
			if (this.mounted) {
				this.setState({ games, totalPages });
			}
		} catch (error) {
			if (this.mounted) {
				this.setState({ error: true });
			}
		}
	}

	renderGames() {
		return this.state.games.map(game => (
			<GameCard key={game.id} game={game} disabledControls />
		));
	}

	renderPaginator() {
		const { page, totalPages } = this.state;
		if (page > totalPages) return null;

		return (
			<Paginator
				currentPage={page}
				totalPages={totalPages}
				onChange={async value => {
					await this.setState({ page: value });
					this.fetchGames();
				}}
			/>
		);
	}

	renderNameInput() {
		return (
			<div className="form-group">
				<input
					className="form-control bg-secondary text-white"
					placeholder="Name"
					value={this.state.name}
					onChange={event => {
						this.onNameChange(event.target.value);
					}}
				/>
			</div>
		);
	}

	renderFilters() {
		return (
			<div className="mt-2">
				{this.renderNameInput()}
				<RatingSelect
					value={this.state.ratingId}
					onChange={value => {
						this.onFilterChange(value, "ratingId");
					}}
				/>
				<GenreSelect
					value={this.state.genreId}
					onChange={value => {
						this.onFilterChange(value, "genreId");
					}}
				/>
			</div>
		);
	}

	renderContent() {
		if (!this.state.games.length) {
			return (
				<div className="alert alert-secondary mt-2">
					No results mathing those parameters.
				</div>
			);
		}
		return (
			<div>
				<div className="row">{this.renderGames()}</div>
				{this.renderPaginator()}
			</div>
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

		if (!this.state.games) return null;

		return (
			<div>
				<div className="row">
					<div className="col-md-3">{this.renderFilters()}</div>
					<div className="col-md-9">{this.renderContent()}</div>
				</div>
			</div>
		);
	}
}

export default Home;
