import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import { gql } from "@apollo/client";
import { Query } from "@apollo/client/react/components";
import PdpDescriptions from "../components/PdpDescriptions";
import { itemAdded } from "../store/cart";
import { connect } from "react-redux";

const LOAD_PRODUCT = gql`
	query GetProduct($id: String!) {
		product(id: $id) {
			id
			name
			brand
			inStock
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
	state = {
		currentImage: null,
	};

	handleImageChange = (uri) => {
		this.setState({ currentImage: uri });
	};

	handleAddToCart = (item, attributes) => {
		const attributeString = Object.entries(attributes).reduce(
			(acc, [key, value]) => {
				acc += `-${key}-${value}`;
				return acc;
			},
			""
		);
		const uniqueId = `${item.id}${attributeString}`;
		const { currency, addToCart } = this.props;
		let product = {
			uniqueId,
			...item,
			selectedAttributes: attributes,
		};
		addToCart({ product, currency });
	};

	render() {
		const { id } = this.props.match.params;
		return (
			<div className="pdp-container">
				<Query query={LOAD_PRODUCT} variables={{ id }}>
					{({ loading, error, data }) => {
						if (loading) return <span>fetching product...</span>;
						if (error) return <span>something went wrong :(</span>;
						const { product } = data;
						const { name, gallery, prices } = product;

						const [currentPrice] = prices.filter(
							(price) => price.currency.label === this.props.currency.label
						);
						return (
							<>
								<div className="pdp-thumbnails">
									{gallery.map((item, index) => (
										<img
											key={index}
											src={item}
											alt={`${name} pic`}
											className="pdp-image-thumbnail"
											onClick={() => this.handleImageChange(item)}
										/>
									))}
								</div>
								<div className="pdp-main-image">
									<img
										src={this.state.currentImage ?? gallery[0]}
										alt={`${name} pic`}
										className="pdp-current-image"
									/>
								</div>
								<PdpDescriptions
									currentPrice={currentPrice}
									product={product}
									onClick={this.handleAddToCart}
								/>
							</>
						);
					}}
				</Query>
			</div>
		);
	}
}

const mapStateToProps = (state) => ({
	currency: state.app.activeCurrency,
});

const mapDispatchToProps = (dispatch) => ({
	addToCart: (product) => dispatch(itemAdded(product)),
});

export default withRouter(
	connect(mapStateToProps, mapDispatchToProps)(ProductDescription)
);
