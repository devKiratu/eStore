import { createSlice } from "@reduxjs/toolkit";

const slice = createSlice({
	name: "cart",
	initialState: {
		products: [],
		totalItems: 0,
	},
	reducers: {
		itemAdded: (cart, action) => {
			cart.products.push(action.payload);
			cart.totalItems += 1;
		},
	},
});

export const { itemAdded } = slice.actions;
export default slice.reducer;
