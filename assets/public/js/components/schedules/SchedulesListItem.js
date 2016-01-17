var React = require('react');
var _ = require('lodash');
var PubSub = require('pubsub-js');

var SchedulesListItem = React.createClass({
	remove: function () {
		var self = this;
		$.ajax({
			url: '/api/schedules/' + this.props.schedule._id,
			method: 'delete',
			success: function() {
				PubSub.publish('schedules:list-item-remove', self.props.schedule._id);
			}
		});
	},
	render: function() {
		var schedule = this.props.schedule;

		return (
			<li className="list-group-item schedule">
				<a href="#">
					<h4 className="name list-group-item-heading">{schedule.name}</h4>
					<p className="recurrence list-group-item-text">Every {schedule.recurrence} day(s)</p>
					<p className="recurrence list-group-item-text">Ends after {schedule.period} repeats</p>

					
					<button type="button" className="btn btn-danger" onClick={this.remove}>
						<span className="glyphicon glyphicon-remove"></span>
					</button>
				</a>
			</li>
		);
	}
});

module.exports = SchedulesListItem;