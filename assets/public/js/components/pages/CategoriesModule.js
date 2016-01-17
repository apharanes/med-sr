var React = require('react');
var _ = require('lodash');

var CategoriesList = require('../categories/CategoriesList');

var CategoriesModule = React.createClass({
	render: function () {
		return (
			<div id="categories-module">				
				<CategoriesList categories="/api/categories" />
			</div>
		);
	}
});

module.exports = CategoriesModule;