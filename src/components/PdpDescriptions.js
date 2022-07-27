import React, { Component } from "react";

export class PdpDescriptions extends Component {
	render() {
		const { attributes, brand, name, currentPrice, inStock, description } =
			this.props;
		return (
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
										className="attribute-type-swatch"
										style={{ backgroundColor: `${i.value}` }}
										key={i.displayValue}
									></p>
								) : (
									<p className="attribute-type-text" key={i.displayValue}>
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
				<button
					className="pdp-add-button"
					disabled={!inStock}
					onClick={() => this.props.onClick()}
				>
					Add to cart
				</button>
				<div
					className="pdp-innerhtml"
					dangerouslySetInnerHTML={{ __html: description }}
				/>
			</div>
		);
	}
}

export default PdpDescriptions;
