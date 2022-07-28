import { createSlice } from "@reduxjs/toolkit";

const appSlice = createSlice({
	name: "app",
	initialState: {
		activeCategory: "all",
		activeCurrency: {
			label: "USD",
			symbol: "$",
		},
	},
	reducers: {
		activeCategorySet: (state, action) => {
			state.activeCategory = action.payload;
		},
		activeCurrencySet: (state, action) => {
			state.activeCurrency = action.payload;
		},
	},
});

export const { activeCategorySet, activeCurrencySet } = appSlice.actions;
export default appSlice.reducer;
