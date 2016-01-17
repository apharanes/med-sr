var React = require('react');
var ReactDOM = require('react-dom');
var _ = require('lodash');
var moment = require('moment');

var ItemsList = require('../items/ItemsList');

var TodayList = React.createClass({
	getInitialState: function () {
		return {
			items: []
		}
	},
	componentDidMount: function () {
		var self = this;
		$.ajax({
			url: '/api/items/by/date',
			method: 'post',
			data: {
				date: this.props.date
			},
			success: function (res) {
				if (self.isMounted()) {
					self.setState({
						items: res
					});
					console.log(res)
				}
			}
		});
	},
	componentWillReceiveProps: function (props) {
		console.log(moment(props.date).toString());
		var self = this;
		$.ajax({
			url: '/api/items/by/date',
			method: 'post',
			data: {
				date: props.date
			},
			success: function (res) {
				if (self.isMounted()) {
					self.setState({
						items: res
					});
				}
			}
		});
	},
	render: function () {
		var date = moment(this.props.date).format('dddd, DD/MMM/YYYY').toString();

		return (
			<div id="today-list">
				<h2>Study Plan for {date}</h2>
				<ItemsList items={this.state.items} />
			</div>
		);
	}
});

module.exports = TodayList;