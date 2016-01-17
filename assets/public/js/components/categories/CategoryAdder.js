var React = require('react');
var _ = require('lodash');
var PubSub = require('pubsub-js');

var CategoryAdder = React.createClass({
	getInitialState: function () {
		return { categories: [] };
	},
	componentDidMount: function () {
		var self = this;

		if(this.isMounted()) {
			$.ajax({
				method: 'GET',
				url: "/api/categories",
				success: function(categories){
					self.setState({
						categories: categories
					});

					if(!_.isEmpty(categories)){
						self.setCategory(categories[0]);
					}
				}
			});
		}
	},
	setCategory: function(category) {
		PubSub.publish('category:select', category);
	},
	handleChange: function (event) {
		var change = event.target;

		var categories = this.state.categories;

		category = _.find(categories, function (category) {
			return category._id == change.value;
		});

		this.setCategory(category);		
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
			</div>
		);
	}
});

module.exports = CategoryAdder;