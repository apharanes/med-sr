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
			} else if (this.props.items != null) {
				this.setState({
					items: this.props.items
				});
			}
		}
	},
	componentWillReceiveProps: function (props) {
		if (this.isMounted()) {
			if (this.props.items != null) {
				this.setState({
					items: props.items
				});
			}
		}
	},
	render: function () {
		var items;
		if (!_.isEmpty(this.state.items)) {
			items = this.state.items.map(function(item, index) {
				return (
					<Item className="item"
						item={item} 
						key={index} />
				);
			});	
		} else {
			items = <Item className="item empty" />
		}


		return (
			<div className="items-list row">					
				<ul className="list-group">
					{ items }		
				</ul>
			</div>
		);
	}
});

module.exports = ItemsList;