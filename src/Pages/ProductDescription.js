import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import { gql } from "@apollo/client";
import { Query } from "@apollo/client/react/components";
import PdpDescriptions from "../components/PdpDescriptions";

const LOAD_PRODUCT = gql`
	query GetProduct($id: String!) {
		product(id: $id) {
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

	render() {
		const { id } = this.props.match.params;
		return (
			<div className="pdp-container">
				<Query query={LOAD_PRODUCT} variables={{ id }}>
					{({ loading, error, data }) => {
						if (loading) return <span>fetching product...</span>;
						if (error) return <span>something went wrong :(</span>;
						const {
							name,
							brand,
							inStock,
							gallery,
							attributes,
							description,
							prices,
						} = data.product;

						const [currentPrice] = prices.filter(
							(p) => p.currency.label === this.props.currency
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
									attributes={attributes}
									brand={brand}
									name={name}
									currentPrice={currentPrice}
									inStock={inStock}
									description={description}
								/>
							</>
						);
					}}
				</Query>
			</div>
		);
	}
}

export default withRouter(ProductDescription);
