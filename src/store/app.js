import { createSlice } from "@reduxjs/toolkit";
import { loadState, updateLocalStorage } from "./localStorage";

const initialState = loadState("app") ?? {
	activeCategory: "all",
	activeCurrency: {
		label: "USD",
		symbol: "$",
	},
	isMinicartOpen: false,
	isCurrencyListOpen: false,
};

const appSlice = createSlice({
	name: "app",
	initialState,
	reducers: {
		activeCategorySet: (state, action) => {
			state.activeCategory = action.payload;
			updateLocalStorage("app", state);
		},
		activeCurrencySet: (state, action) => {
			state.activeCurrency = action.payload;
			updateLocalStorage("app", state);
		},
		minicartToggled: (state) => {
			state.isMinicartOpen = !state.isMinicartOpen;
			updateLocalStorage("app", state);
		},
		currencyListToggled: (state) => {
			state.isCurrencyListOpen = !state.isCurrencyListOpen;
		},
		closeCurrencyList: (state) => {
			state.isCurrencyListOpen = false;
		},
	},
});

export const {
	activeCategorySet,
	activeCurrencySet,
	minicartToggled,
	currencyListToggled,
	closeCurrencyList,
} = appSlice.actions;
export default appSlice.reducer;
