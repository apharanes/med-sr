var React = require('react');
var ReactDOM = require('react-dom');
var _ = require('lodash');

var TagInputItem = require('./TagInputItem');

var TagInput = React.createClass({
	getInitialState: function () {
		return {
			style: {
				border: '1px solid gray',
				padding: '5px',
				height: 'auto',				
				minHeight: '32px'
			}
		};
	},
	render: function () {
		var items = this.props.items;
		var newItem = {};

		var newTag = <TagInputItem
						item={newItem} 
						writeMode={true}
						valueKey="name" 
						key="_new" isActive={this.props.isActive} />;

		var list = [];
		if(!_.isEmpty(items)){			
			list = items.map(function (item, index) {
				if(!_.isEmpty(item)) {
					return (
						<TagInputItem item={item} writeMode={false} valueKey="name" key={index} />
					);
				}
			});

		}

		list.push(newTag);
		

		return (
			<div className="tag-input" ref="tagInput" style={this.state.style}>
				{list}
			</div>
		);
	}
});

module.exports = TagInput;