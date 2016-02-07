var React = require('react');
var _ = require('lodash');

var ItemProgram = React.createClass({
	render: function () {
		var program = this.props.program;

		return (
			<label className="label label-success program">
				{program.name}
			</label>
		);
	}
});

module.exports = ItemProgram;