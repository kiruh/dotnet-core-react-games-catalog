/* eslint-env browser */
import axios from "axios";
import store from "~/store";

import { getHeaders, getToken } from "~/utils";
import { setUser, setFetchingUser } from "./index";
import { TOKEN_STORAGE_KEY } from "~/constants";

export const getUser = async () => {
	if (!getToken()) {
		await store.dispatch(setFetchingUser(false));
		await store.dispatch(setUser(null));
	}

	await store.dispatch(setFetchingUser(true));
	try {
		const response = await axios.get("/api/account/getuser", {
			headers: getHeaders(),
		});
		const user = response.data;
		await store.dispatch(setUser(user));
	} catch (error) {
		console.error(error);
	}
	await store.dispatch(setFetchingUser(false));
};

export const login = async ({ email, password }) => {
	const response = await axios.post("/api/account/login/", {
		email,
		password,
	});
	const { token } = response.data;

	localStorage.setItem(TOKEN_STORAGE_KEY, token);
	getUser();
};

export const register = async ({ email, password, firstName, lastName }) => {
	const response = await axios.post("/api/account/register/", {
		email,
		password,
		firstName,
		lastName,
	});
	const { token } = response.data;

	localStorage.setItem(TOKEN_STORAGE_KEY, token);
	getUser();
};

export const logout = async () => {
	localStorage.removeItem(TOKEN_STORAGE_KEY);
	await getUser();
};
