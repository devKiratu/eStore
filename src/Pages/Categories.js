import React, { Component } from "react";
import ProductCard from "../components/ProductCard";
import { gql } from "@apollo/client";
import { Query } from "@apollo/client/react/components";
import { Link } from "react-router-dom";

const LOAD_ALL_PRODUCTS = gql`
	query GetAllProducts($title: String!) {
		category(input: { title: $title }) {
			name
			products {
				id
				name
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
			}
		}
	}
`;

export class Categories extends Component {
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
							// console.log(data);
							return data.category.products.map((item) => (
								<Link
									className="routing-link"
									to={`/products/${item.id}`}
									key={item.id}
									id={item.id}
								>
									<ProductCard
										category={this.props.category}
										currency={this.props.currency}
										product={item}
									/>
								</Link>
							));
						}}
					</Query>
				</div>
			</div>
		);
	}
}

export default Categories;
