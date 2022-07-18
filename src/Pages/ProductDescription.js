import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import { gql } from "@apollo/client";
import { Query } from "@apollo/client/react/components";

const LOAD_PRODUCT = gql`
	query GetProduct($id: String!) {
		product(id: $id) {
			name
			brand
			attributes {
				name
				type
				items {
					displayValue
					value
					id
				}
			}
			gallery
			description
		}
	}
`;

export class ProductDescription extends Component {
	render() {
		const { id } = this.props.match.params;
		return (
			<div className="pdp-container">
				<Query query={LOAD_PRODUCT} variables={{ id }}>
					{({ loading, error, data }) => {
						if (loading) return <span>fetching product...</span>;
						if (error) return <span>something went wrong :(</span>;
						const { name, brand, gallery, attributes, description } =
							data.product;
						console.log(data);
						return (
							<>
								<div className="pdp-thumbnails">thumbnails</div>
								<div className="pdp-main-image">main image</div>
								<div className="pdp-descriptions">
									<p className="brand-name">{brand}</p>
									<p className="pdp-product-name">{name}</p>
									<p className="pdp-attribute-name">{attributes[0]?.name}:</p>
									<p className="pdp-attribute-name">price:</p>
									<button className="pdp-add-button">Add to cart</button>
									<div
										className="pdp-innerhtml"
										dangerouslySetInnerHTML={{ __html: description }}
									/>
								</div>
							</>
						);
					}}
				</Query>
			</div>
		);
	}
}

export default withRouter(ProductDescription);
