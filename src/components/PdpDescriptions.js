import React, { Component } from "react";
import Attribute from "./Attribute";
import { Interweave } from "interweave";

export class PdpDescriptions extends Component {
	state = {
		selectedAttributes: {},
	};

	componentDidMount() {
		this.props.product.attributes.forEach((a) => {
			this.setState((prevState) => ({
				selectedAttributes: {
					...prevState.selectedAttributes,
					[a.name]: a.items[0].value,
				},
			}));
		});
	}

	handleAttributeChange = (a) => {
		let attribute = Object.keys(this.state.selectedAttributes).filter(
			(k) => k === Object.keys(a)[0]
		)[0];
		let value = Object.values(a)[0];
		this.setState({
			...this.state,
			selectedAttributes: {
				...this.state.selectedAttributes,
				[attribute]: value,
			},
		});
	};

	render() {
		const { attributes, brand, name, inStock, description } =
			this.props.product;
		const { currentPrice } = this.props;
		return (
			<div className="pdp-descriptions">
				<p className="brand-name">{brand}</p>
				<p className="pdp-product-name">{name}</p>
				{attributes.map((attribute, index) => (
					<div key={index}>
						<p className="pdp-attribute-name" key={attribute.name}>
							{attribute.name}:
						</p>
						<div>
							{attribute.items.map((item, index) => (
								<Attribute
									attribute={attribute}
									item={item}
									key={index}
									selected={this.state.selectedAttributes[attribute.name]}
									onAttributeChange={this.handleAttributeChange}
									typeSwatch={"attribute-type-swatch"}
									typeText={"attribute-type-text"}
								/>
							))}
						</div>
					</div>
				))}
				<p className="pdp-attribute-name">price: </p>
				<p className="pdp-price-details">
					{currentPrice.currency.symbol} {currentPrice.amount}
				</p>
				<button
					className="pdp-add-button"
					disabled={!inStock}
					onClick={() =>
						this.props.onClick(
							this.props.product,
							this.state.selectedAttributes
						)
					}
				>
					Add to cart
				</button>
				<div />
				<Interweave content={description} className="pdp-innerhtml" />
			</div>
		);
	}
}

export default PdpDescriptions;
