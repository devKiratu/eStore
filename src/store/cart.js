import { createSlice } from "@reduxjs/toolkit";

const slice = createSlice({
	name: "cart",
	initialState: [],
	reducers: {
		itemAdded: (cart, action) => {
			cart.push(action.payload);
		},
	},
});

export const { itemAdded } = slice.actions;
export default slice.reducer;
