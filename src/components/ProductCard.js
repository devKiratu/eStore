import React, { Component } from "react";

export class ProductCard extends Component {
	render() {
		const { product, currency } = this.props;
		const [currentPrice] = product.prices.filter(
			(p) => p.currency.label === currency
		);
		return (
			<div className="product-card">
				<div className="card-container">
					<div className="product-main-image">
						<img className="product-img" src={product.gallery[0]} alt="" />
					</div>
					<p className="product-name">{product.name}</p>
					<p className="product-price">
						{currentPrice.currency.symbol}
						{currentPrice.amount}
					</p>
				</div>
			</div>
		);
	}
}

export default ProductCard;
