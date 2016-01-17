var React = require('react');
var ReactDOM = require('react-dom');
var _ = require('lodash');
var PubSub = require('pubsub-js');

var TagInputItem = React.createClass({
	getInitialState: function () {
		return {		
			styleInput: {
				border: 'none',
				borderRadius: '20px',
				outline: 'none',
				background: 'none',
				width: '120px'
			},
			styleSpan: {
				color: '#ffffff',
				background: '#7FBBD8',
				borderRadius: '20px',
				display: 'inline-block',
				margin: '3px',
				padding: '3px 13px'
			},
			styleSpanValue: {
				marginRight: '8px'
			}
		};
	},
	componentWillReceiveProps: function (nextProps) {
		this.setState({
			writeMode: nextProps.writeMode
		});
	},
	componentDidUpdate: function () {
		if(this.props.isActive) {
			this.focusInput();
		}
	},
	focusInput: function () {
		if(this.state.writeMode) {
			ReactDOM.findDOMNode(this.refs.inputText).focus();
		}
	},
	handleChange: function (event) {		
		var query = event.target.value;
		PubSub.publish('tag-input:type', query);
	},
	handleFocus: function () {
		PubSub.publish('tag-input:focus');
	},
	handleKeyDown: function (event) {
		switch (event.keyCode) {
			case 13: 	this.registerInput(event);
						break;
		}
	},
	registerInput: function (event) {
		var value = event.target.value;

		PubSub.publish('tag-input:register', value);

		this.setState({
			writeMode: false
		});
	},
	setMode: function (mode) {
		this.setState({
			mode: mode
		});
	},
	remove: function () {
		PubSub.publish('tag-input:remove', this.props.item);
	},
	render: function () {
		var item = this.props.item;
		var value = this.props.valueKey;

		if (this.state.writeMode) {
			return (
				<div className="tag-input-item" style={this.state.styleSpan}>
					<input 
						type="text" 
						ref="inputText"
						style={this.state.styleInput}
						onChange={this.handleChange}
						onFocus={this.handleFocus}
						onKeyDown={this.handleKeyDown} />
				</div>
			);
		} 
		// read mode
		else {			
			return (
				<div className="tag-input-item" style={this.state.styleSpan}>
					<span className="value" style={this.state.styleSpanValue}>{item[value]}</span>
					<span className="glyphicon glyphicon-remove" onClick={this.remove}></span>
				</div>
			);
		}
	}
});

module.exports = TagInputItem;