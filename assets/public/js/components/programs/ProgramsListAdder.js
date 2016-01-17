var React = require('react');
var _ = require('lodash');
var PubSub = require('pubsub-js');

var AutoSuggestions = require('../autosuggestions/AutoSuggestions');

var ProgramsListAdder = React.createClass({
	getInitialState: function () {
		return {
			newItem: {},
			schedules: []
		}
	},
	componentWillMount: function () {
		var self = this;
		PubSub.subscribe('autosuggestions:items:update', this.updateAutoSuggestedItems);
	},
	updateAutoSuggestedItems: function (msg, update) {
		if (this.isMounted()) {
			if(update.type === 'schedules') {
				this.setState({
					schedules: update.items
				});
			}
		}
	},
	handleChange: function (event) {
		if (this.isMounted()) {
			var change = event.target;
			var attribute = '';

			switch(change.id){
				case 'item-name':
					this.setState({ name : change.value });
					break;
			}
		}
	},
	handleSubmit: function () {
		var self = this;

		var newItem = {
			name: this.state.name,
			schedules: _.pluck(this.state.schedules, '_id')
		};

		$.ajax({			
			url: '/api/programs',
			method: 'post',
			data: newItem,
			success: function (program) {
				PubSub.publish('programs:list-item-add', program);
				self.handleClear();
			}
		});
	},
	handleClear: function () {
		if (this.isMounted()) {
			this.setState({
				name: '',
				schedules: []
			});
		}
	},
	render: function () {
		var name = this.state.name;

		return (
			<div id="list-item-adder">
				<form className="form-horizontal">
					<div className="form-group">
						<label for="item-name" className="col-sm-2 control-label">Name</label>
						<div className="col-sm-10">
							<input 
								type="text" 
								className="form-control" 
								id="item-name"
								placeholder="Item name"
								value={ name }
								onChange={this.handleChange} />
						</div>
					</div>
					<div className="form-group">
						<label className="col-sm-2 control-label">Schedules</label>
						<div className="col-sm-10">
							<AutoSuggestions url="/api/schedules" type="schedules" filterKey="name" selectedItems={this.state.schedules} />
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

module.exports = ProgramsListAdder;