var React = require('react');
var _ = require('lodash');
var PubSub = require('pubsub-js');

var MenuItem = React.createClass({
	getInitialState: function() {
		return { menuItem: this.props.menuItem }
	},
	componentDidMount: function () {
		if (this.isMounted()) {
			this.setState({
				menuItem: this.props.menuItem
			});
		}
	},
	setView: function () {
		if (this.props.menuItem.key === this.state.menuItem.key) {
			PubSub.publish('set-view', this.props.menuItem);
		}
	}
	,
	render: function () {
		var menuItem = this.props.menuItem;

		return (
			<li onClick={this.setView}><a>{ menuItem.name }</a></li>
		);
	}
});

module.exports = MenuItem;