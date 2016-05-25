var React = require('react');
var _ = require('lodash');
var PubSub = require('pubsub-js');

var ItemsFilter = React.createClass({
	getInitialState: function () {
		return {
			filterKeys: ['categories'],
			currentFilter: 'categories',
			categories: [],
			selected: 'all'
		};
	},
	componentDidMount: function () {
		var self = this;
		if (this.isMounted()) {
			$.ajax({
				url: '/api/categories',
				method: 'GET',
				success: function (categories) {
					categories.unshift({ _id: 'all', name: 'All'});

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
		this.setState({ selected: id })
	},
	handleChange: function (event) {
		var filter = event.target.value;

		this.setFilters(filter);		
	},
	clearFilters: function () {
		this.setState({
			selected: 'all'
		});
		PubSub.publish('items:filter:all');
	},
	render: function () {
		var categories;
		var selected = this.state.selected;

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
				<div className="form-horizontal">
					<div className="form-group">
						<div className="col-sm-9">
							<select 
								ref="select"
								className="form-control" 
								onChange={this.handleChange} 
								value={selected}
								>
									{categories}
							</select>
						</div>
						<button type="clear" className="btn btn-default col-sm-3" onClick={this.clearFilters}>Clear Filters</button>
					</div>
				</div>
			</div>
		);
	}
});

module.exports = ItemsFilter;