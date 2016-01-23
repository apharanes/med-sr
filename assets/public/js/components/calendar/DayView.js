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
            currentDate: this.setToday()
        }
    },
    loadNextDay: function () {
        if (this.isMounted()) {
            this.setState({
                currentDate: moment(this.state.currentDate).startOf('day').add(1, 'days')
            });
        }
    },
    loadPreviousDay: function () {
        if (this.isMounted()) {
            this.setState({
                currentDate: moment(this.state.currentDate).startOf('day').subtract(1, 'days')
            });
        }
    },
    loadToday: function () {
        if (this.isMounted()) {
            this.setState({
                currentDate: this.setToday()
            })
        }
    },
    handleDateInput: function (event) {
        if (this.isMounted()) {
            this.setState({
                date: event.target.value
            })
        }
    },
    setToday: function () {
      return moment(Date.now()).startOf('day');
    },
    loadDate: function (event) {
        var date = event.target.value;


        if (this.isMounted()) {
            this.setState({
                currentDate: moment(this.state.date, 'DD-MM-YYYY').startOf('day')
            });
        }
    },
    render: function () {
        return (
            <div className="day-view">
                <button type="button" onClick={this.loadPreviousDay}>Prev</button>
                <button type="button" onClick={this.loadToday}>Today</button>
                <button type="button" onClick={this.loadNextDay}>Next</button>

                <div>
                    <span>Date: </span>
                    <input type="date" onChange={this.handleDateInput}/>
                    <button type="button" className="btn btn-default" onClick={this.loadDate}>Go</button>
                </div>
                <h3>{this.state.currentDate.format('dddd, DD/MMM/YYYY').toString()}</h3>

                <TodayList date={this.state.currentDate.valueOf()} />
            </div>
        );
    }
});

module.exports = DayView;
