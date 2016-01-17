var React = require('react');
var _ = require('lodash');
var PubSub = require('pubsub-js');

var ProgramListItem = React.createClass({
	remove: function () {
		var self = this;
		$.ajax({
			url: '/api/programs/' + this.props.program._id,
			method: 'delete',
			success: function() {
				PubSub.publish('programs:list-item-remove', self.props.program._id);
			}
		});
	},
	render: function() {
		var program = this.props.program;

		if(_.isEmpty(program)) {
			return (
				<li className="list-group-item program">
					No items yet.
				</li>
			)
		} else {
			var schedules = JSON.stringify(_.pluck(program.schedules, 'name'));
			return (
				<li className="list-group-item">
					<a href="#">
						<h4 className="item-name list-group-item-heading">{program.name}</h4>
						<p className="item-description list-group-item-text">{program.startDate}</p>

						<p className="schedules list-group-item-text">{schedules}</p>
						
						<button type="button" className="btn btn-danger" onClick={this.remove}>
							<span className="glyphicon glyphicon-remove"></span>
						</button>
					</a>
				</li>
			);
		}
	}
});

module.exports = ProgramListItem;