var React = require('react');
var _ = require('lodash');
var PubSub = require('pubsub-js');

var ProgramAdder = React.createClass({
	getInitialState: function () {
		return {
			programs: []
		};
	},
	componentDidMount: function () {
		var self = this;
		var selected = this.props.selected;

		if(this.isMounted()) {
			$.ajax({
				method: 'GET',
				url: "/api/programs",
				success: function(programs){
					self.setState({
						programs: programs
					});
					if (programs.length > 0) {
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
		var selected;
		if(!_.isEmpty(this.state.programs)) {
			programs = this.state.programs.map(function (program, index) {
				return (
					<option value={program._id} key={index}>{program.name}</option>
				);
			});
				
			if (this.props.selected.hasOwnProperty('_id')) {
				selected = this.props.selected._id;
			} else {
				selected = this.state.programs[0]._id;
			}

		} else {
			programs = <option value="empty">No programs are created yet.</option>
			selected = 'empty';
		}

		return (
			<div className="program list-adder">
				<select className="form-control" onChange={this.handleChange} value={selected}>
					{programs}
				</select>
			</div>
		);
	}
});

module.exports = ProgramAdder;