var React = require('react');
var _ = require('lodash');
var PubSub = require('pubsub-js');

var CategoriesListItem = React.createClass({
	remove: function () {
		var self = this;
		$.ajax({
			url: '/api/categories/' + this.props.category._id,
			method: 'delete',
			success: function() {
				PubSub.publish('categories:list-item-remove', self.props.category._id);
			}
		});
	},
	render: function() {
		var category = this.props.category;

		
		return (
			<li className="list-group-item category">
				<a href="#">
					<h4 className="name list-group-item-heading">{category.name}</h4>
					<p className="recurrence list-group-item-text">{category.description}</p>
					
					<button type="button" className="btn btn-danger" onClick={this.remove}>
						<span className="glyphicon glyphicon-remove"></span>
					</button>
				</a>
			</li>
		);
	}
});

module.exports = CategoriesListItem;