var React = require('react');
var _ = require('lodash');

var ItemTag = React.createClass({
	render: function () {
		var tag = this.props.tag;

		return (
			<li className="tag">
				<span>{tag.name}</span>
				<span className="glyphicon glyphicon-remove"></span>
			</li>
		);
	}
});

module.exports = ItemTag;