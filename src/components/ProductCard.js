import React, { Component } from "react";
import cart from "../img/Vectorwhite-cart.svg";

export class ProductCard extends Component {
	state = {
		showCart: false,
	};

	handleHover = () => {
		this.setState({ showCart: !this.state.showCart });
	};

	render() {
		const { product, currency } = this.props;
		const [currentPrice] = product.prices.filter(
			(p) => p.currency.label === currency
		);
		return (
			<div
				className="product-card"
				onMouseEnter={this.handleHover}
				onMouseLeave={this.handleHover}
			>
				<div className="card-container">
					<div className="product-main-image">
						{!product.inStock && (
							<span
								style={{
									position: "absolute",
									bottom: "50%",
									right: "30%",
									color: "#8d8f9a",
									fontSize: "24px",
									fontWeight: "400",
								}}
							>
								OUT OF STOCK
							</span>
						)}
						<img
							className={`product-img ${
								!product.inStock && "out-of-stock-img"
							}`}
							src={product.gallery[0]}
							alt=""
						/>
						{this.state.showCart && product.inStock && (
							<span className="cart-container">
								<img className="cart-on-card" src={cart} alt={"cart icon"} />
							</span>
						)}
					</div>
					<p
						className={`product-name ${
							!product.inStock && "out-of-stock-text"
						}`}
					>
						{product.name}
					</p>
					<p
						className={`product-price ${
							!product.inStock && "out-of-stock-text"
						}`}
					>
						{currentPrice.currency.symbol}
						{currentPrice.amount}
					</p>
				</div>
			</div>
		);
	}
}

export default ProductCard;
