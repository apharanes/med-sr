/** To enable React DevTools in chrome **/
window.React = require('react');

/** @jsx React.DOM */
var APP = require('./components/app'),
	React = require('react');

React.render(
	<APP />,
	document.getElementById('main'));
