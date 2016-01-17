var React = require('react');
var _ = require('lodash');
var PubSub = require('pubsub-js');

var CategoriesListAdder = require('./CategoriesListAdder');
var CategoriesListItem = require('./CategoriesListItem');

var CategoriesList = React.createClass({
	getInitialState: function () {
		return { categories: [] };
	},
	componentWillMount: function () {
	},
	addItem: function(msg, category) {
		if (this.isMounted()) {
			this.state.categories.push(category);
			this.setState({
				categories: this.state.categories
			})
		}
	},
	removeItem: function(msg, categoryId) {
		if (this.isMounted()) {
			categories = _.reject(this.state.categories,
				function(category) {
					return category._id === categoryId;
				});
			console.log(categories);
			this.setState({
				categories: categories
			});
		}
	},
	componentDidMount: function () {
		var self = this;

		PubSub.subscribe('categories:list-item-add', this.addItem);
		PubSub.subscribe('categories:list-item-remove', this.removeItem);

		$.ajax({
			url: this.props.categories, 
			method: 'get',
			success: function (res) {
				if (self.isMounted()) {
					self.setState({
						categories: res
					});
				}
			},
			error: function (err) {
				console.log(err);
			}
		});
	},
	render: function () {
		var categories;
		if (!_.isEmpty(this.state.categories)) {
			categories = this.state.categories.map(function(category, index) {
				return (
					<CategoriesListItem className="category"
						category={category} 
						key={index} />
				);
			});	
		} else {
			categories = <div className="list-item empty">No categories</div>
		}


		return (
			<div className="categories items-list row">
				<div className="col-md-6">
					<CategoriesListAdder items={this.state.categories} />
				</div>
				<div className="col-md-6">						
					<ul className="list-group">
						{ categories }		
					</ul>
				</div>
			</div>
		);
	}
});

module.exports = CategoriesList;