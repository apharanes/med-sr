var React = require('react');
var _ = require('lodash');
var PubSub = require('pubsub-js');

var ListItemAdder = require('./ListItemAdder');

var Item = require('./Item');

var ItemsList = React.createClass({
	getInitialState: function () {
		return {
			items: [],
			url: ''
		};
	},
	componentWillMount: function () {
		PubSub.subscribe('list-item-add', this.addItem);
		PubSub.subscribe('list-item-delete', this.removeItem);
	},
	addItem: function(msg, item) {
		if (this.isMounted()) {
			this.state.items.push(item);
			this.setState({
				items: this.state.items
			});
		}
	},
	removeItem: function(msg, itemId) {
		if (this.isMounted()) {
			var items = _.reject(this.state.items,
				function(item) {
					return item._id === itemId;
				});
			this.setState({
				items: items
			});
		}
	},
	componentDidMount: function () {
		var self = this;

		if (this.isMounted()) {
			if (this.props.url != null) {
				$.ajax({
					url: this.props.url,
					success: function (res) {
						self.setState({
							items: res
						});
					}
				});
			}
		}
	},
	render: function () {
		var itemsComponent, items;
		var self = this;
		if (this.props.items != null) {
			items = this.props.items;
		} else { // this.props.url != null
			items = this.state.items;
		}
		if (!_.isEmpty(items)) {
			itemsComponent = items.map(function(item, index) {
				return (
					<Item className="item"
						item={item} 
						key={index}
						  editMode={self.props.editMode}
					/>
				);
			});	
		} else {
			itemsComponent = <Item className="item empty" />
		}


		return (
			<div className="items-list row">					
				<ul className="list-group">
					{ itemsComponent }
				</ul>
			</div>
		);
	}
});

module.exports = ItemsList;