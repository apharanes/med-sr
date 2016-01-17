var React = require('react');
var _ = require('lodash');

var ItemCategory = require('./ItemCategory');

var ItemCategories = React.createClass({
	getInitialState: function () {
		return { categories: [] };
	},
	componentDidMount: function () {
		if(this.isMounted()) {
			this.setState({
				categories: this.props.categories
			});
		}
	},
	render: function () {
		var categories;
		if(!_.isEmpty(this.state.categories)){
			categories = this.state.categories.map(function (category, index) {
			return (
				<ItemCategory 
					category={category} 
					key={index} />
				);
			});
		} else {
			categories = <div className="empty">No categories</div>
		}

		return (
			<div className="item-categories">
				{categories}
			</div>
		);		
	}
});

module.exports = ItemCategories;