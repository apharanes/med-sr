var React = require('react');
var _ = require('lodash');

var ItemsListAddable = require('../items/ItemsListAddable');

var ItemsModule = React.createClass({
	render: function () {
		return (
			<div id="items-module" className="module">
				<ItemsListAddable url="/api/items" />
			</div>
		);
	}
});

module.exports = ItemsModule;