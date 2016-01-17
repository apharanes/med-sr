var React = require('react');
var _ = require('lodash');
var PubSub = require('pubsub-js');

var SchedulesListAdder = require('./SchedulesListAdder');
var SchedulesListItem = require('./SchedulesListItem');

var SchedulesList = React.createClass({
	getInitialState: function () {
		return { schedules: [] };
	},
	componentWillMount: function () {
	},
	addItem: function(msg, schedule) {
		if (this.isMounted()) {
			this.state.schedules.push(schedule);
			this.setState({
				schedules: this.state.schedules
			});
		}
	},
	removeItem: function(msg, scheduleId) {
		if (this.isMounted()) {
			schedules = _.reject(this.state.schedules,
				function(schedule) {
					return schedule._id === scheduleId;
				});
			this.setState({
				schedules: schedules
			});
		}
	},
	componentDidMount: function () {
		var self = this;

		PubSub.subscribe('schedules:list-item-add', this.addItem);
		PubSub.subscribe('schedules:list-item-remove', this.removeItem);

		$.ajax({
			url: this.props.schedules, 
			method: 'get',
			success: function (res) {
				if (self.isMounted()) {
					self.setState({
						schedules: res
					});
				}
			},
			error: function (err) {
				console.log(err);
			}
		});
	},
	render: function () {
		var schedules;
		if (!_.isEmpty(this.state.schedules)) {
			schedules = this.state.schedules.map(function(schedule, index) {
				return (
					<SchedulesListItem className="schedule"
						schedule={schedule} 
						key={index} />
				);
			});	
		} else {
			schedules = <div className="list-item empty">No schedules</div>
		}


		return (
			<div className="schedules items-list row">
				<div className="col-md-6">
					<SchedulesListAdder items={this.state.schedules} />
				</div>
				<div className="col-md-6">						
					<ul className="list-group">
						{ schedules }		
					</ul>
				</div>
			</div>
		);
	}
});

module.exports = SchedulesList;