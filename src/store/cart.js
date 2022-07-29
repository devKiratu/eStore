import { createSlice, current } from "@reduxjs/toolkit";

const slice = createSlice({
	name: "cart",
	initialState: {
		products: [],
		totalItems: 0,
		totalPrice: 0,
	},
	reducers: {
		itemAdded: (cart, action) => {
			const { currency, product } = action.payload;
			cart.products.push(product);
			cart.totalItems = cart.products.length;
			const [currentPrice] = product.prices.filter(
				(p) => p.currency.label === currency.label
			);
			cart.totalPrice += currentPrice.amount;
		},
		pricesUpdated: (cart, action) => {
			const prices = current(cart.products).map((p) => p.prices);
			const amounts = [];
			prices.forEach((p) => {
				let [currentPrice] = p.filter(
					(p) => p.currency.label === action.payload.label
				);
				amounts.push(currentPrice);
			});
			let updatedTotal = amounts.reduce((acc, val) => {
				acc += val.amount;
				return acc;
			}, 0);

			cart.totalPrice = updatedTotal;
		},
	},
});

export const { itemAdded, pricesUpdated } = slice.actions;
export default slice.reducer;
