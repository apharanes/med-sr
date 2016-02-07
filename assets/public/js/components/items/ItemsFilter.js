var React = require('react');
var _ = require('lodash');
var PubSub = require('pubsub-js');

var ItemsFilter = React.createClass({
	getInitialState: function () {
		return {
			filterKeys: ['categories'],
			currentFilter: 'categories',
			categories: []
		};
	},
	componentDidMount: function () {
		var self = this;
		if (this.isMounted()) {
			$.ajax({
				url: '/api/categories',
				method: 'GET',
				success: function (categories) {
					categories.push({ _id: 'all', name: 'All'});

					self.setState({
						categories: categories
					});
				}
			})
		}
	},
	setFilters: function (id) {
		if (id == 'all') {
			this.clearFilters();
		} else {
			PubSub.publish('items:filter', {
				keys: this.state.currentFilter,
				objectId: id
			});
		}
	},
	handleChange: function (event) {
		var filter = event.target.value;

		this.setFilters(filter);		
	},
	clearFilters: function () {
		PubSub.publish('items:filter:all')
	},
	render: function () {
		var categories;

		if(!_.isEmpty(this.state.categories)) {
			categories = this.state.categories.map(function (category, index) {
				return (
					<option value={category._id} key={index}>{category.name}</option>
				);
			});
		} else {
			categories = <option>No categories are created yet.</option>
		}

		return (
			<div className="category list-adder">
				<select className="form-control" onChange={this.handleChange}>
					{categories}
				</select>
				<button className="btn btn-default" onClick={this.clearFilters}>Clear Filters</button>
			</div>
		);
	}
});

module.exports = ItemsFilter;