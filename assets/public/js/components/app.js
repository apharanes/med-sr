/* @jsx React.DOM */
var APP, React;

React = require('react');
_ = require('lodash');

var MenuBar = require('./menu/MenuBar');
var MainView = require('./pages/MainView');
var Modal = require('./generic/Modal');

var menuItems = [
	{
		key: 'dashboard',
		name: 'Dashboard',
		url: 'dashboard',
		active: true
	},
	{
		key: 'items',
		name: 'Items',
		url: 'items',
		active: true
	},
	{
		key: 'calendar',
		name: 'Calendar',
		url: 'calendar',
		active: false
	},
	{
		key: 'programs',
		name: 'Patterns',
		url: 'patterns',
		active: true
	},
	{
		key: 'schedules',
		name: 'Schedules',
		url: 'schedules',
		active: true
	},
	{
		key: 'categories',
		name: 'Categories',
		url: 'categories',
		active: true
	},
	{
		key: 'tags',
		name: 'Tags',
		url: 'tags',
		active: true
	}
];

var modules = _.reduce(menuItems, function(menuItem) {
	return { name: menuItem.name };
});

var defaultModule = menuItems[0];

APP = React.createClass({
	getInitialState: function () {
		return { menuItems: [] };	
	},
	render: function () {
		return (
			<div className="container-fluid">
				<MenuBar menuItems={menuItems} />
				<MainView module={defaultModule} />
				<Modal></Modal>
			</div>
		);
	}
});

module.exports = APP;
