var React = require('react');
var _ = require('lodash');

var AutoSuggestionsList = require('../autosuggestions/AutoSuggestionsList');

var ScheduleAdder = React.createClass({
	render: function () {
		return (
			<div className="category list-adder">
				<AutoSuggestionsList type="schedule" />
			</div>
		);
	}
});

module.exports = ScheduleAdder;