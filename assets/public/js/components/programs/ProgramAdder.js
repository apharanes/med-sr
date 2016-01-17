var React = require('react');
var _ = require('lodash');
var PubSub = require('pubsub-js');

var ProgramAdder = React.createClass({
	getInitialState: function () {
		return { programs: [] };
	},
	componentDidMount: function () {
		var self = this;

		if(this.isMounted()) {
			$.ajax({
				method: 'GET',
				url: "/api/programs",
				success: function(programs){
					self.setState({
						programs: programs
					});

					if(!_.isEmpty(programs)){
						self.setProgram(programs[0]);
					}
				}
			});
		}
	},
	setProgram: function(program) {
		PubSub.publish('program:select', program);
	},
	handleChange: function (event) {
		var change = event.target;

		var programs = this.state.programs;

		program = _.find(programs, function (program) {
			return program._id == change.value;
		});

		this.setProgram(program);		
	},
	render: function () {
		var programs;

		if(!_.isEmpty(this.state.programs)) {
			programs = this.state.programs.map(function (program, index) {
				return (
					<option value={program._id} key={index}>{program.name}</option>
				);
			});
		} else {
			programs = <option>No programs are created yet.</option>
		}

		return (
			<div className="program list-adder">
				<select className="form-control" onChange={this.handleChange}>
					{programs}
				</select>
			</div>
		);
	}
});

module.exports = ProgramAdder;