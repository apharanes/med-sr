var React = require('react');
var _ = require('lodash');
var PubSub = require('pubsub-js');

var AutoSuggestionItem = React.createClass({
	getInitialState: function () {
		return {
			style: {
				padding: '5px',
				borderBottom: '1px solid gray'
			}
		};
	},
	handleSelect: function () {
		PubSub.publish('autosuggestions:item:select', this.props.item);
	},
	render: function () {
		var item = this.props.item;

		return (
			<li className="item" style={this.state.style} onClick={this.handleSelect}>
				<span className="name">{item.name}</span>
			</li>
		);
	}
});

module.exports = AutoSuggestionItem;