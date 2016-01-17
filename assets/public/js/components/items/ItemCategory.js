var React = require('react');
var _ = require('lodash');

var ItemCategory = React.createClass({
	render: function () {
		var category = this.props.category;

		return (
			<span className="category">
				{category.name}
			</span>
		);
	}
});

module.exports = ItemCategory;