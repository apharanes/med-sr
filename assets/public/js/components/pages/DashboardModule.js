var React = require('react');
var _ = require('lodash');

var DayView = require('../calendar/DayView');

var DashboardModule = React.createClass({
	render: function () {
		return (
			<div id="dashboard-module">				
				<h2>Dashboard</h2>
				<DayView />
			</div>
		);
	}
});

module.exports = DashboardModule;