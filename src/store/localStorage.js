export const loadState = (key) => {
	return JSON.parse(localStorage.getItem(key));
};

export const updateLocalStorage = (key, data) => {
	try {
		localStorage.setItem(key, JSON.stringify(data));
	} catch (error) {}
};

export const clearCart = () => {
	localStorage.removeItem("cart");
};
