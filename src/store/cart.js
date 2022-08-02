import { createSlice, current } from "@reduxjs/toolkit";

const slice = createSlice({
	name: "cart",
	initialState: {
		products: {},
		totalItems: 0,
		totalPrice: 0,
	},
	reducers: {
		itemAdded: (cart, action) => {
			const { currency, product } = action.payload;
			if (!cart.products.hasOwnProperty(product.uniqueId)) {
				cart.products[product.uniqueId] = [product];
			} else {
				cart.products[product.uniqueId].push(product);
			}
			updateTotals(cart);
			updatePrices(cart, currency);
		},
		pricesUpdated: (cart, action) => {
			updatePrices(cart, action.payload);
		},

		productCountIncremented: (cart, action) => {
			const productArray = cart.products[action.payload.id];
			productArray.push(productArray[0]);
			updateTotals(cart);
			updatePrices(cart, action.payload.currency);
		},

		productCountDecremented: (cart, action) => {
			const productArray = cart.products[action.payload.id];
			productArray.pop();
			updateTotals(cart);
			updatePrices(cart, action.payload.currency);
		},
	},
});

const updateTotals = (cart) => {
	cart.totalItems = Object.values(cart.products).reduce((acc, val) => {
		acc += val.length;
		return acc;
	}, 0);
};

const updatePrices = (cart, currency) => {
	const products = Object.values(current(cart.products));
	const amounts = [];
	products.forEach((productArray) => {
		if (productArray.length > 0) {
			let [currentPrice] = productArray[0].prices.filter(
				(price) => price.currency.label === currency.label
			);
			amounts.push(currentPrice.amount * productArray.length);
		}
	});
	let updatedTotal = amounts.reduce((acc, val) => {
		acc += val;
		return acc;
	}, 0);

	cart.totalPrice = updatedTotal;
};

export const {
	itemAdded,
	pricesUpdated,
	productCountIncremented,
	productCountDecremented,
} = slice.actions;
export default slice.reducer;
