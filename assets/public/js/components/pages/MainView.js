var React = require('react');
var _ = require('lodash');
var PubSub = require('pubsub-js');

var ModuleView = require('./ModuleView');

var MainView = React.createClass({
	getInitialState: function () {
		return { module: this.props.module }
	},
	componentWillMount: function () {
		PubSub.subscribe('set-view', this.setCurrentModule);
	},
	componentDidMount: function () {
		if (this.isMounted()) {
			this.setCurrentModule(this.props.module);
		}
	},
	setCurrentModule: function (msg, module) {
		if (this.isMounted()) {
			this.setState({
				module: module
			});
		}
	},
	render: function () {
		var module = this.state.module;

		return (
			<div id="main-container" className="container-fluid">
				<ModuleView module={module} />
			</div>
		)
	}
});

module.exports = MainView;