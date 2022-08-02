import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "./cart";
import appReducer from "./app";

const store = configureStore({
	reducer: {
		cart: cartReducer,
		app: appReducer,
	},
});

export default store;
