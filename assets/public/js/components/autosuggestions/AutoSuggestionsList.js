var React = require('react');
var _ = require('lodash');

var AutoSuggestionItem = require('./AutoSuggestionItem');

var AutoSuggestionsList = React.createClass({
	getInitialState: function () {
		return { 
			items: [],
			style: {
				border: '1px solid gray',
				position: 'absolute',
				maxHeight: '120px',
				overflow: 'auto',
				width: '100%',
				background: '#ffffff',
				zIndex: '100'
			}
		};
	},
	render: function () {
		var items = this.props.items;

		var items;
		if(!_.isEmpty(items)) {
			items = items.map(function(item, index) {
				return (
					<AutoSuggestionItem item={item} key={index}/>
				)
			});
		} else {
			items = <div className="item empty">No results.</div>
		}

		return (
				<ul className="list" 
					ref="list"
					style={this.state.style}>
						{items}
				</ul>
		);
	}
});

module.exports = AutoSuggestionsList;