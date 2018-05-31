import React from "react";
import axios from "axios";

import Spinner from "~/components/Spinner";
import RatingForm from "./RatingForm";
import RatingCard from "./RatingCard";

class Ratings extends React.Component {
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
			if (this.mounted) {
				this.setState({ error: true });
			}
		}
	}

	async removeRating(id) {
		try {
			await axios.delete(`/api/ratings/${id}`);
			this.fetchRatings();
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

	renderRatings() {
		return this.state.ratings.map(rating => {
			const { id } = rating;
			const invalid = this.state.errors[id];

			return (
				<RatingCard
					key={id}
					rating={rating}
					invalid={invalid}
					removeRating={() => this.removeRating(id)}
					dismissError={() => this.dismissError(id)}
					onEditSuccess={() => {
						this.fetchRatings();
					}}
				/>
			);
		});
	}

	renderRatingForm() {
		return (
			<RatingForm
				onSave={async () => {
					await this.fetchRatings();
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

		if (!this.state.ratings) return <Spinner />;

		return (
			<div>
				<div className="row">
					{this.renderRatings()}
					{this.renderRatingForm()}
				</div>
			</div>
		);
	}
}

export default Ratings;
