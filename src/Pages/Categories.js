import React, { Component } from "react";
import ProductCard from "../components/ProductCard";
import { gql } from "@apollo/client";
import { Query } from "@apollo/client/react/components";

const LOAD_ALL_PRODUCTS = gql`
	query GetAllProducts($title: String!) {
		category(input: { title: $title }) {
			name
			products {
				name
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
				<h3>{this.props.category}</h3>
				<div className="products-container">
					<Query query={LOAD_ALL_PRODUCTS} variables={{ title: category }}>
						{({ loading, error, data }) => {
							if (loading) return <span>loading...</span>;
							if (error) return <span>Something went wrong :(</span>;
							console.log(data);
							return data.category.products.map((item, index) => (
								<ProductCard
									category={this.props.category}
									currency={this.props.currency}
									key={index}
									product={item}
								/>
							));
						}}
					</Query>
				</div>
			</div>
		);
	}
}

export default Categories;
