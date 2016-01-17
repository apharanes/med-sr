var React = require('react');
var ReactDOM = require('react-dom');
var _ = require('lodash');
var PubSub = require('pubsub-js');

var TagInput = require('./TagInput');
var AutoSuggestionsList = require('./AutoSuggestionsList');

var AutoSuggestions = React.createClass({
	getInitialState: function () {
		return { 
			items: [],
			searchQuery: '',
			style: {
				position: 'relative'
			},
			searchResults: [],
			selectedItems: [],
			isResultsShown: false,
			isActive: false
		};
	},
	componentWillReceiveProps: function (nextProps) {
		this.setState({
			selectedItems: nextProps.selectedItems
		});
	},
	componentWillMount: function () {
		PubSub.subscribe('tag-input:type', this.handleSearch);		
		PubSub.subscribe('tag-input:focus', this.handleFocus);
		PubSub.subscribe('tag-input:register', this.registerItem);
		PubSub.subscribe('tag-input:remove', this.removeItem);
		PubSub.subscribe('autosuggestions:item:select', this.handleSelect);
	},
	componentDidMount: function () {
		var self = this;

		if (this.isMounted()) {
			$.ajax({
				method: 'get',
				url: this.props.url,
				success: function (items) {
					self.setState({
						items: items					
					});
				}
			});
		}

		window.addEventListener('click', this.hideList, false);
	},
	componentWillUnmount: function () {
		window.removeEventListener('click', this.hideList);
	},
	hideList: function (event) {
		if(this.isMounted()) {
			if(!_.isNull(ReactDOM.findDOMNode(this.refs.autosuggestions))) {
				if(ReactDOM.findDOMNode(this.refs.autosuggestions).contains(event.target)){
					this.setState({
						isActive: true
					});
				} else {
					this.setState({
						isResultsShown: false,
						isActive: false
					});
				}
			}
		}
	},
	registerItem: function (msg, item) {
		var selection;

		if (item.id == null) { // assume item refers to first result found
			if (!_.isEmpty(this.state.searchResults)) {
				// select the first child
				selection = this.state.searchResults[0];
			}
		} else {
			selection = item;
		}

		this.handleSelect(msg, selection);
	},
	handleFocus: function () {
		if (this.isMounted()) {
			this.setState({
				isResultsShown: true
			});
			this.handleSearch(null, '');
		}
	},
	handleSearch: function (msg, query) {
		if (this.isMounted()) {
			var key = this.props.filterKey;

			var filteredItems = this.state.items;
			if(!_.isEmpty(query)){
				filteredItems = _.filter(filteredItems, function(item) {
					return _.contains(item[key].toLowerCase(), query.toLowerCase());
				});
			}

			this.setState({
				searchQuery: query,
				searchResults: filteredItems
			});
		}
	},
	handleSelect: function (msg, item) {
		if (!_.isUndefined(item) && this.isMounted()) {
			var selectedItems = this.state.selectedItems;
			selectedItems.push(item);

			this.setState({
				selectedItems: selectedItems,
				searchResults: this.state.items
			});
		}
	},
	removeItem: function (msg, item) {
		if (this.isMounted()) {
			var selectedItems = _.reject(this.state.selectedItems, function (selectedItem) {
				return selectedItem._id === item._id;
			});

			this.setState({
				selectedItems: selectedItems
			});

			this.notifyChange();
		}
	},
	notifyChange: function () {
		PubSub.publish('autosuggestions:items:update', { 
			items: this.state.selectedItems, 
			type: this.props.type }
		);
	},
	render: function () {
		var searchQuery = this.state.searchQuery;
		var searchResults = this.state.searchResults;
		var isResultsShown = this.state.isResultsShown;
		var filterKey = this.props.filterKey;

		var list;
		if(isResultsShown) {
			list = <AutoSuggestionsList ref="list"
						items={searchResults} />;
		} else {
			list = null;
		}
		return (
			<div className="autosuggestions" style={this.state.style} ref="autosuggestions">

				<TagInput items={this.state.selectedItems} isActive={this.state.isActive} />

				{list}
			</div>
		);
	}
});

module.exports = AutoSuggestions;