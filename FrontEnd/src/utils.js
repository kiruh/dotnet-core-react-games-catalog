/* eslint-env browser */
import { TOKEN_STORAGE_KEY } from "~/constants";

export const getToken = () => localStorage.getItem(TOKEN_STORAGE_KEY);

export const getHeaders = () => ({
	Authorization: `Bearer ${getToken()}`,
});
