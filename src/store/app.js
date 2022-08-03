import { createSlice } from "@reduxjs/toolkit";

const appSlice = createSlice({
	name: "app",
	initialState: {
		activeCategory: "all",
		activeCurrency: {
			label: "USD",
			symbol: "$",
		},
		isMinicartOpen: false,
	},
	reducers: {
		activeCategorySet: (state, action) => {
			state.activeCategory = action.payload;
		},
		activeCurrencySet: (state, action) => {
			state.activeCurrency = action.payload;
		},
		minicartToggled: (state) => {
			state.isMinicartOpen = !state.isMinicartOpen;
		},
	},
});

export const { activeCategorySet, activeCurrencySet, minicartToggled } =
	appSlice.actions;
export default appSlice.reducer;
