var React = require('react');
var _ = require('lodash');
var PubSub = require('pubsub-js');

var ListItemAdder = require('./ListItemAdder');

var Item = require('./Item');

var ItemsList = React.createClass({
	getInitialState: function () {
		return {
			items: [],
			allItems: [],
			url: '',
			totalItems: 362
		};
	},
	componentWillMount: function () {
		PubSub.subscribe('list-item-add', this.addItem);
		PubSub.subscribe('list-item-delete', this.removeItem);
		PubSub.subscribe('items:filter', this.filter);
		PubSub.subscribe('items:filter:all', this.filterAll);
	},
	addItem: function(msg, item) {
		if (this.isMounted()) {
			this.state.items.push(item);
			this.setState({
				items: this.state.items,
				allItems: this.state.items
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
				items: items,
				allItems: items
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
							allItems: res
						});
						self.filterAll();
					}
				});
			}
		}
	},
	getPercentage: function () {
		percentage = (this.state.allItems.length / this.state.totalItems) * 100;
		rounded = parseFloat(percentage).toFixed(2);
		return rounded;
	},
	filter: function (msg, filters) {
		var filteredItems = [];

		if (this.isMounted()) {
			filteredItems = _.filter(this.state.allItems, function (item) {
				itemFilterIds = _.pluck(item[filters.keys], '_id');

				return _.includes(itemFilterIds, filters.objectId);
			});

			this.setState({
				items: filteredItems
			});
		}
	},
	filterAll: function () {
		if (this.isMounted()) {
			this.setState({
				items: this.state.allItems
			});
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
			<div className="items-list">
				<div className="list-stats">
					<div className="stats-filtered list-stat">
						<span>Selected: </span>
						<span>{this.state.items.length}</span>
					</div>			
					<div className="stats-total list-stat">
						<span>Total: </span>
						<span>{this.state.allItems.length} / {this.state.totalItems} </span>
						<span>({this.getPercentage() + '%'})</span>
					</div>
				</div>

				<ul className="list-group">
					{ itemsComponent }
				</ul>
			</div>
		);
	}
});

module.exports = ItemsList;