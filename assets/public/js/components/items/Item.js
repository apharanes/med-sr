var React = require('react');
var _ = require('lodash');
var PubSub = require('pubsub-js');
var moment = require('moment');

var ItemPrograms = require('./ItemPrograms');
var ItemCategories = require('./ItemCategories');
var ItemTags = require('./ItemTags');

var Item = React.createClass({
	getInitialState: function () {
		return {
			style: {
				readMode: {
					display: 'none'
				},
				editMode: {
					display: 'initial'
				}
			}
		};
	},
	componentWillMount: function () {
		PubSub.subscribe('item:remove', this.remove);
	},
	removePrompt: function () {
		PubSub.publish(
			'modal:show',
			{
				title: 'Items',
				body: 'Are you sure you want to remove this item?',
				confirmMessage: {
					eventName: 'item:remove',
					id: this.props.item._id
				}
			}
		);
	},
	remove: function (msg, id) {
		var self = this;

		$.ajax({
			url: '/api/items/' + id,
			method: 'delete',
			success: function() {
				PubSub.publish('list-item-delete', id);
			}
		});
	},
	getNextOccurrence: function (recurrences) {
		var today = moment(Date.now()).startOf('day').valueOf();

		var dates = _.map(recurrences,
			function (recurrence) {
				return moment(recurrence).startOf('day').valueOf() }
		);

		dates = _.reject(dates,
			function (recurrence) {
				return recurrence == today;
			}
		);

		var tuples = _.map(dates,
			function (recurrence) {
				return [recurrence, Math.abs(recurrence - today)];
			}
		);

		var recurrence = _.reduce(tuples,
			function (memo, val) {
				if (memo[1] < val[1]) {
					return memo;
				}
				else {
					return val;
				}
			}
			, [-1, 999999999999]
		)[0];

		return moment(recurrence).toString();
	},
	render: function () {
		var style;
		var item = this.props.item;
		var editMode = this.props.editMode;
		if (editMode) {
			style = this.state.style.editMode;
		} else {
			style = this.state.style.readMode;
		}


		if(_.isEmpty(item)) {
			return (
				<li className="list-group-item">
					No items yet.
				</li>
			)
		} else {

			var nextOccurrence = this.getNextOccurrence(item.recurrences);

			return (
				<li className="list-group-item">
					<a href="#">
						<h4 className="item-name list-group-item-heading">{item.name}</h4>
						<p className="item-start-date list-group-item-text">{item.startDate}</p>
						<p className="item-description list-group-item-text">{item.description}</p>
						<p className="item-description list-group-item-text">
							<span>Next Date: </span>
							<span>{nextOccurrence}</span>
						</p>
						<ItemPrograms programs={item.programs} />
						<ItemCategories categories={item.categories} />
						<ItemTags tags={item.tags} />
						<div className="edit-functions" style={style}>
							<button type="button" className="btn btn-danger btn-small" onClick={this.removePrompt}>
								<span className="glyphicon glyphicon-remove"></span>
							</button>
						</div>
					</a>
				</li>
			);
		}
	}
});

module.exports = Item;