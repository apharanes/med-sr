var React = require('react');
var _ = require('lodash');
var PubSub = require('pubsub-js');

var ItemPrograms = require('./ItemPrograms');
var ItemCategories = require('./ItemCategories');
var ItemTags = require('./ItemTags');

var Item = React.createClass({
		return { item: {} };
	},
	componentDidMount: function () {
		if(this.isMounted()) {
			this.setState({
				item: this.props.item
			});
	},
	remove: function () {
		var self = this;

		$.ajax({
			url: '/api/items/' + this.props.item._id,
			method: 'delete',
			success: function() {
				PubSub.publish('list-item-delete', self.props.item._id);
			}
		});
	},
	render: function () {
		var item = this.state.item;

		if(_.isEmpty(item)) {
			return (
				<li className="list-group-item">
					No items yet.
				</li>
			)
		} else {

			
			return (
				<li className="list-group-item">
					<a href="#">
						<h4 className="item-name list-group-item-heading">{item.name}</h4>
						<p className="item-start-date list-group-item-text">{item.startDate}</p>
						<p className="item-description list-group-item-text">{item.description}</p>
						<ItemPrograms programs={item.programs} />
						<ItemCategories categories={item.categories} />
						<ItemTags tags={item.tags} />
						<button type="button" className="btn btn-danger" onClick={this.remove}>
							<span className="glyphicon glyphicon-remove"></span>
						</button>
					</a>
				</li>
			);
		}
	}
});

module.exports = Item;