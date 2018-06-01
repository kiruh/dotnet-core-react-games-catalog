/* eslint-env browser  */
import { SET_USER, SET_FETCHING_USER } from "~/actions/types";

export const ONE_FIELD_SETTERS = {
	[SET_USER]: "user",
	[SET_FETCHING_USER]: "fetchingUser",
};

export const getInitialState = () => ({ fetchingUser: true, user: null });
