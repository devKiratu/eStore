import React, { Component } from "react";
import ProductCard from "../components/ProductCard";
import { gql } from "@apollo/client";
import { Query } from "@apollo/client/react/components";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

const LOAD_ALL_PRODUCTS = gql`
	query GetAllProducts($title: String!) {
		category(input: { title: $title }) {
			name
			products {
				id
				name
				brand
				inStock
				category
				gallery
				prices {
					amount
					currency {
						label
						symbol
					}
				}
				attributes {
					name
					type
					items {
						displayValue
						value
						id
					}
				}
			}
		}
	}
`;

export class Categories extends Component {
	componentDidMount() {
		window.scrollTo(0, 0);
	}

	render() {
		const { category } = this.props;

		return (
			<div>
				<p className="header-text">{this.props.category}</p>
				<div className="products-container">
					<Query query={LOAD_ALL_PRODUCTS} variables={{ title: category }}>
						{({ loading, error, data }) => {
							if (loading) return <span>loading...</span>;
							if (error) return <span>Something went wrong :(</span>;
							return data.category.products.map((item) => (
								<Link
									to={`products/${item.id}`}
									key={item.id}
									className="routing-link"
								>
									<ProductCard product={item} id={item.id} />
								</Link>
							));
						}}
					</Query>
				</div>
			</div>
		);
	}
}

const mapStateToProps = (state) => ({
	category: state.app.activeCategory,
	currency: state.app.activeCurrency,
});

export default connect(mapStateToProps)(Categories);
