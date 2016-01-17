var React = require('react');
var _ = require('lodash');

var SchedulesList = require('../schedules/SchedulesList');

var SchedulesModule = React.createClass({
	render: function () {
		return (
			<div id="schedules-module">				
				<SchedulesList schedules="/api/schedules" />
			</div>
		);
	}
});

module.exports = SchedulesModule;