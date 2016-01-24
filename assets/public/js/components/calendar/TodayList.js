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
	componentWillMount: function () {
		this.getItemsByDate(this.props.date);
	},
	componentWillReceiveProps: function (props) {
		this.getItemsByDate(props.date);
	},
	getItemsByDate: function (date) {
		var self = this;
		$.ajax({
			url: '/api/items/by/date',
			method: 'post',
			data: {
				date: date
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
		var date = moment(this.props.date).format('dddd, MM/DD/YYYY').toString();

		return (
			<div id="today-list">
				<h2>Study Plan for {date}</h2>
				<ItemsList items={this.state.items} editMode={false}/>
			</div>
		);
	}
});


module.exports = TodayList;