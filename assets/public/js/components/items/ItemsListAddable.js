var React = require('react');
var _ = require('lodash');

var ListItemAdder = require('./ListItemAdder');
var ItemsList = require('./ItemsList');
var ItemsFilter = require('../items/ItemsFilter');

var ItemsListAddable = React.createClass({
	render: function () {
		return (
			<div className="items-addable row">
				<div className="col-md-5 left-column column">
					<ListItemAdder />
				</div>
				<div className="col-md-7 right-column column">
					<ItemsFilter />
					<ItemsList url={this.props.url} editMode={true}/>
				</div>
			</div>
		);
	}
});

module.exports = ItemsListAddable;