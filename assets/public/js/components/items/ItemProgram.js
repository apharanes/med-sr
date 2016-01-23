var React = require('react');
var _ = require('lodash');

var ItemProgram = React.createClass({
	render: function () {
		var program = this.props.program;

		return (
			<span className="program">
				{program.name}
			</span>
		);
	}
});

module.exports = ItemProgram;