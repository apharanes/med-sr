/**
 * Created by jeeka on 17/01/16.
 */

var React = require('react');
var ReactDOM = require('react-dom');
var _ = require('lodash');
var moment = require('moment');

var TodayList = require('./TodayList');

var DayView = React.createClass({
    getInitialState: function () {
        return {
            currentDate: moment(Date.now())
        }
    },
    loadNextDay: function () {
        if (this.isMounted()) {
            this.setState({
                currentDate: moment(this.state.currentDate).add(1, 'days')
            });
        }
    },
    loadPreviousDay: function () {
        if (this.isMounted()) {
            this.setState({
                currentDate: moment(this.state.currentDate).subtract(1, 'days')
            });
        }
    },
    loadToday: function () {
        if (this.isMounted()) {
            this.setState({
                currentDate: moment(Date.now())
            })
        }
    },
    render: function () {
        return (
            <div className="day-view">
                <button type="button" onClick={this.loadPreviousDay}>Prev</button>
                <button type="button" onClick={this.loadToday}>Today</button>
                <button type="button" onClick={this.loadNextDay}>Next</button>
                <h3>{this.state.currentDate.format('dddd, DD/MMM/YYYY').toString()}</h3>

                <TodayList date={this.state.currentDate.valueOf()} />
            </div>
        );
    }
});

module.exports = DayView;
