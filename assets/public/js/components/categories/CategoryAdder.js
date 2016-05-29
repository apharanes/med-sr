var React = require('react');
var _ = require('lodash');
var PubSub = require('pubsub-js');

var CategoryAdder = React.createClass({
	getInitialState: function () {
		return { 
			selected: 'empty',
			categories: []
		};
	},
	componentDidMount: function () {
		var self = this;
		var selected = this.props.selected;

		if(this.isMounted()) {
			$.ajax({
				method: 'GET',
				url: "/api/categories",
				success: function(categories){
					self.setState({
						categories: categories
					});
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
		var selected, categories;
		if (typeof this.props.selected == 'object') {
			selected = this.props.selected._id;
		} else {
			if (_.isEmpty(this.state.categories)) {
				selected = 'empty';
			} else {
				selected = this.state.categories[0]._id;
			}
		}

		if(!_.isEmpty(this.state.categories)) {
			categories = this.state.categories.map(function (category, index) {
				return (
					<option value={category._id} key={index}>{category.name}</option>
				);
			});
		} else {
			categories = <option value="empty">No categories are created yet.</option>
		}

		return (
			<div className="category list-adder">
				<select className="form-control" onChange={this.handleChange} value={selected}>
					{categories}
				</select>
			</div>
		);
	}
});

module.exports = CategoryAdder;