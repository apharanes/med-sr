var React = require('react');
var _ = require('lodash');
var PubSub = require('pubsub-js');

var SchedulesListAdder = React.createClass({
	getInitialState: function () {
		return {
			newItem: {},
			durationName: '',
			recurrence: 0,
			period: 1
		}
	},
	handleChange: function (event) {
		if (this.isMounted()) {
			var change = event.target;
			var attribute = '';

			switch(change.id){
				case 'schedule-name':
					this.setState({ name : change.value });
					break;
				case 'schedule-recurrence':
					this.setState({ recurrence : change.value });
					break;
				case 'schedule-period':
					this.setState({ period : change.value });
					break;
			}
		}
	},
	handleSubmit: function () {
		var self = this;

		var newItem = {
			name: this.state.name,
			durationName: this.state.durationName,
			period: this.state.period,
			recurrence: this.state.recurrence
		};

		$.ajax({			
			url: '/api/schedules',
			method: 'post',
			data: newItem,
			success: function (schedule) {
				PubSub.publish('schedules:list-item-add', schedule);
				self.handleClear();
			},
			error: function (err) {
				console.log(err);
			}
		});
	},
	handleClear: function () {
		if (this.isMounted()) {
			this.setState({
				name: '',
				durationName: '',
				recurrence: 0,
				period: 1
			});
		}
	},
	render: function () {
		var name = this.state.name;
		var durationName = this.state.durationName;
		var recurrence = this.state.recurrence;
		var period = this.state.period;

		return (
			<div id="list-item-adder">
				<form className="form-horizontal">			
					<div className="form-group">
						<label className="col-sm-2 control-label">Name</label>
						<div className="col-sm-10">
							<input 
								type="text" 
								className="form-control" 
								id="schedule-name"
								placeholder="Schedule name"
								value={ name }
								onChange={this.handleChange} />
						</div>
					</div>	
					<div className="form-group">
						<label className="col-sm-2 control-label">Recurrence (in days)</label>
						<div className="col-sm-10">
							<input 
								type="number" 
								className="form-control" 
								id="schedule-recurrence"
								placeholder="Repeat every (n) days"
								value={ recurrence }
								onChange={this.handleChange} />
						</div>
					</div>
					<div className="form-group">
						<label className="col-sm-2 control-label">Period</label>
						<div className="col-sm-10">
							<input 
								type="number" 
								className="form-control" 
								id="schedule-period"
								placeholder="End after n repeats"
								value={ period }								
								onChange={this.handleChange} />
						</div>
					</div>

				</form>

				<div className="btn-toolbar">
					<button className="btn btn-default" onClick={this.handleClear}>Clear</button>
					<button type="submit" className="btn btn-primary" onClick={this.handleSubmit}>Add</button>
				</div>
			</div>
		);
	}
});

module.exports = SchedulesListAdder;