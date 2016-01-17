var React = require('react');
var _ = require('lodash');
var PubSub = require('pubsub-js');

var ProgramsListAdder = require('./ProgramsListAdder');
var ProgramListItem = require('./ProgramListItem');

var ProgramsList = React.createClass({
	getInitialState: function () {
		return { programs: [] };
	},
	componentWillMount: function () {
		PubSub.subscribe('programs:list-item-add', this.addItem);
		PubSub.subscribe('programs:list-item-remove', this.removeItem);
	},
	addItem: function(msg, program) {
		if (this.isMounted()) {
			this.state.programs.push(program);
			this.setState({
				programs: this.state.programs
			})
		}
	},
	removeItem: function(msg, programId) {
		if (this.isMounted()) {
			programs = _.reject(this.state.programs,
				function(program) {
					return program._id === programId;
				});
			this.setState({
				programs: programs
			});
		}
	},
	componentDidMount: function () {
		$.get(this.props.programs, function (res) {
			if (this.isMounted()) {
				this.setState({
					programs: res
				});
			}
		}.bind(this));
	},
	render: function () {
		var programs;
		if (!_.isEmpty(this.state.programs)) {
			programs = this.state.programs.map(function(program, index) {
				return (
					<ProgramListItem className="program"
						program={program} 
						key={index} />
				);
			});	
		} else {
			programs = <ProgramListItem className="program-item empty" />
		}


		return (
			<div className="programs items-list row">
				<div className="col-md-6">
					<ProgramsListAdder items={this.state.programs} />
				</div>
				<div className="col-md-6">						
					<ul className="list-group">
						{ programs }		
					</ul>
				</div>
			</div>
		);
	}
});

module.exports = ProgramsList;