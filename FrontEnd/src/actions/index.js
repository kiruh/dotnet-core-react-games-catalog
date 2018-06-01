import { SET_USER, SET_FETCHING_USER } from "./types";

export const oneFieldDispatch = (type, payload) => async dispatch => {
	await dispatch({
		type,
		payload,
	});
};

export const setUser = payload => oneFieldDispatch(SET_USER, payload);

export const setFetchingUser = payload =>
	oneFieldDispatch(SET_FETCHING_USER, payload);
