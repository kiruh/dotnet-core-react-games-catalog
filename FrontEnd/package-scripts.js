const config = {
	lint: "eslint src --ext .js,.jsx",
	watch: "webpack --config watch.js --progress --hide-modules --watch",
	build: "cross-env NODE_ENV=production webpack --progress --hide-modules",
	prettify: `prettier --config .prettierrc --write "src/**/*"`,
};

module.exports = {
	scripts: config,
};
