import React, { Component } from "react";
import { gql } from "@apollo/client";
import { Query } from "@apollo/client/react/components";

const LOAD_CATEGORIES = gql`
	query GetCategories {
		categories {
			name
		}
	}
`;

export class Navbar extends Component {
	render() {
		return (
			<div>
				<div className="navbar">
					<div>
						<Query query={LOAD_CATEGORIES}>
							{({ loading, error, data }) => {
								if (loading) return <span>fetching categories ...</span>;
								if (error) return <span>Oops! :(</span>;
								return data.categories.map((category, index) => (
									<span
										className="nav-item"
										key={index}
										onClick={() => this.props.onClick(category.name)}
									>
										{category.name}
									</span>
								));
							}}
						</Query>
					</div>
					<div>
						<span className="nav-item">Logo</span>
					</div>
					<div>
						<span className="nav-item">$ v</span>
						<span className="nav-item">Cart</span>
					</div>
				</div>
			</div>
		);
	}
}

export default Navbar;
