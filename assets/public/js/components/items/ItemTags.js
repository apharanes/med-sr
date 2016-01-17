var React = require('react');
var _ = require('lodash');

var ItemTag = require('./ItemTag');

var ItemTags = React.createClass({
	getInitialState: function() {
		return { tags: [] };
	},
	componentDidMount: function () {
		if (this.isMounted()) {
			this.setState({
				tags: this.props.tags
			});
		}
	},
	render: function () {
		var tags;
		if(!_.isEmpty(this.props.tags)){
			tags = this.props.tags.map(function (tag, index) {
				return (
					<ItemTag 
						tag={tag}
						key={index} />
				);
			});
		} else {
			items = <div className="empty">Add some tags</div>
		}

		return (
			<div className="item-tags">
				{tags}
			</div>
		);
	}
});

module.exports = ItemTags;