var React = require('react');
var _ = require('lodash');

var ListItemAdder = require('./ListItemAdder');
var ItemsList = require('./ItemsList');

var ItemsListAddable = React.createClass({
	render: function () {
		return (
			<div className="items-list row">
				<div className="col-md-5">
					<ListItemAdder />
				</div>
				<div className="col-md-7">						
					<ItemsList url={this.props.url} editMode={true}/>
				</div>
			</div>
		);
	}
});

module.exports = ItemsListAddable;