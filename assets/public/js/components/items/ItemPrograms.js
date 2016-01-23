var React = require('react');
var _ = require('lodash');

var ItemProgram = require('./ItemProgram');

var ItemPrograms = React.createClass({
	getInitialState: function () {
		return { programs: [] };
	},
	componentDidMount: function () {
		if(this.isMounted()) {
			this.setState({
				programs: this.props.programs
			});
		}
	},
	render: function () {
		var programs;
		if(!_.isEmpty(this.state.programs)){
			programs = this.state.programs.map(function (program, index) {
			return (
				<ItemProgram 
					program={program} 
					key={index} />
				);
			});
		} else {
			programs = <div className="empty">No programs</div>
		}

		return (
			<div className="item-programs">
				{programs}
			</div>
		);		
	}
});

module.exports = ItemPrograms;