var React = require('react');
var _ = require('lodash');

var MenuItem = require('./MenuItem');

var MenuBar = React.createClass({
	getInitialState: function () {
		return { menuItems: [] };
	},
	componentDidMount: function () {
		if (this.isMounted()) {
			this.setState({
				menuItems: this.props.menuItems
			});
		}
	},
	render: function () {
		var menuItems = this.state.menuItems.map(function (menuItem, index) {
			if (menuItem.active) {
				return (
					<MenuItem 
						menuItem={menuItem} 
						key={index} />
					);	
			}
		});

		return (
			<nav className="navbar navbar-default">
				<div className="navbar-header">
					<a className="navbar-brand">Med-SR</a>
				</div>
				<ul className="nav navbar-nav">
					{ menuItems }
				</ul>
			</nav>
		);
	}
});

module.exports = MenuBar;