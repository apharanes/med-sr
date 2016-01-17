var React = require('react');
var _ = require('lodash');

var ProgramsList = require('../programs/ProgramsList');

var ProgramsModule = React.createClass({
	render: function () {
		return (
			<div id="programs-module">				
				<ProgramsList programs="/api/programs" />
			</div>
		);
	}
});

module.exports = ProgramsModule;