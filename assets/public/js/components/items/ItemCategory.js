var React = require('react');
var _ = require('lodash');

var ItemCategory = React.createClass({
	render: function () {
		var category = this.props.category;

		return (
			<label className="label label-primary category">
				{category.name}
			</label>
		);
	}
});

module.exports = ItemCategory;