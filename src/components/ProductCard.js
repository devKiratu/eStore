import React, { Component } from "react";
import cart from "../img/Vectorwhite-cart.svg";
import { connect } from "react-redux";
import { itemAdded } from "../store/cart";
import { Link } from "react-router-dom";

export class ProductCard extends Component {
	state = {
		showCart: false,
		defaultAttributes: {},
	};

	componentDidMount() {
		this.props.product.attributes.forEach((a) => {
			this.setState((prevState) => ({
				defaultAttributes: {
					...prevState.defaultAttributes,
					[a.name]: a.items[0].value,
				},
			}));
		});
	}

	handleAddToCart = () => {
		const { defaultAttributes } = this.state;
		const attributeString = Object.entries(defaultAttributes).reduce(
			(acc, [key, value]) => {
				acc += `-${key}-${value}`;
				return acc;
			},
			""
		);
		const uniqueId = `${this.props.product.id}${attributeString}`;
		const { currency, addToCart } = this.props;
		let product = {
			uniqueId,
			...this.props.product,
			selectedAttributes: defaultAttributes,
		};
		addToCart({ product, currency });
	};

	handleHover = () => {
		this.setState({ showCart: !this.state.showCart });
	};

	render() {
		const { product, currency } = this.props;
		const [currentPrice] = product.prices.filter(
			(p) => p.currency.label === currency.label
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
							<span className="outofstock-watermark">OUT OF STOCK</span>
						)}
						<img
							className={`product-img ${
								!product.inStock && "out-of-stock-img"
							}`}
							src={product.gallery[0]}
							alt={`${product.name} pic`}
						/>
						{this.state.showCart && product.inStock && (
							<span
								className="cart-container"
								onClick={() => this.handleAddToCart()}
							>
								<img className="cart-on-card" src={cart} alt={"cart icon"} />
							</span>
						)}
					</div>
					<Link to={`products/${this.props.id}`} className="routing-link">
						<p
							className={`product-name ${
								!product.inStock && "out-of-stock-text"
							}`}
						>
							{`${product.brand} ${product.name}`}
						</p>
						<p
							className={`product-price ${
								!product.inStock && "out-of-stock-text"
							}`}
						>
							{currentPrice.currency.symbol}
							{currentPrice.amount}
						</p>
					</Link>
				</div>
			</div>
		);
	}
}

const mapStateToProps = (state) => ({
	category: state.app.activeCategory,
	currency: state.app.activeCurrency,
});

const mapDispatchToProps = (dispatch) => ({
	addToCart: (args) => dispatch(itemAdded(args)),
});

export default connect(mapStateToProps, mapDispatchToProps)(ProductCard);
