import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import { gql } from "@apollo/client";
import { Query } from "@apollo/client/react/components";

const LOAD_PRODUCT = gql`
	query GetProduct($id: String!) {
		product(id: $id) {
			name
			brand
			prices {
				currency {
					label
					symbol
				}
				amount
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
			gallery
			description
		}
	}
`;

export class ProductDescription extends Component {
	render() {
		const { id } = this.props.match.params;
		console.log(this.props);
		return (
			<div className="pdp-container">
				<Query query={LOAD_PRODUCT} variables={{ id }}>
					{({ loading, error, data }) => {
						if (loading) return <span>fetching product...</span>;
						if (error) return <span>something went wrong :(</span>;
						const { name, brand, gallery, attributes, description } =
							data.product;
						console.log("gallery", gallery);
						console.log("attributes ", attributes);
						const [currentPrice] = data.product.prices.filter(
							(p) => p.currency.label === this.props.currency
						);
						// console.log("current price", currentPrice);
						return (
							<>
								<div className="pdp-thumbnails">
									{gallery.map((item, index) => (
										<img
											key={index}
											src={item}
											alt={`${name} pic`}
											style={{
												width: "79px",
												height: "80px",
												objectFit: "contain",
												border: "1px solid gray",
												marginBottom: "32px",
											}}
										/>
									))}
								</div>
								<div className="pdp-main-image">main image</div>
								<div className="pdp-descriptions">
									<p className="brand-name">{brand}</p>
									<p className="pdp-product-name">{name}</p>
									{attributes.map((a, i) => (
										<div key={i}>
											<p className="pdp-attribute-name" key={a.name}>
												{a.name}:
											</p>
											<div>
												{a.items.map((i) =>
													a.type === "swatch" ? (
														<p
															style={{
																backgroundColor: `${i.value}`,
																border: "0.5px solid gray",
																width: "32px",
																height: "32px",
																margin: "8px 10px 36px 0",
																display: "inline-block",
															}}
															key={i.displayValue}
														></p>
													) : (
														<p
															style={{
																border: "1px solid gray",
																width: "63px",
																height: "45px",
																margin: "8px 12px 24px 0",
																display: "inline-flex",
																justifyContent: "center",
																alignItems: "center",
															}}
															key={i.displayValue}
														>
															{i.value}
														</p>
													)
												)}
											</div>
										</div>
									))}
									<p className="pdp-attribute-name">price: </p>
									<p className="pdp-price-details">
										{currentPrice.currency.symbol} {currentPrice.amount}
									</p>
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
