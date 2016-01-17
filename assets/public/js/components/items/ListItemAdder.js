var React = require('react');
var _ = require('lodash');
var PubSub = require('pubsub-js');

var ProgramAdder = require('../programs/ProgramAdder');
var CategoryAdder = require('../categories/CategoryAdder');
var TagAdder = require('../tags/TagAdder');

var ListItemAdder = React.createClass({
	getInitialState: function () {
		return {
			name: '',
			description: '',
			categories: [],
			programs: []
		};
	},
	componentWillMount: function () {
		PubSub.subscribe('category:select', this.selectCategory);
		PubSub.subscribe('program:select', this.selectProgram);
	},
	selectCategory: function(msg, category) {
		if (this.isMounted()) {
			var categories = [];
			categories.push(category._id);
			this.setState({
				categories: categories
			});
		}
	},
	selectProgram: function(msg, program) {
		if (this.isMounted()) {
			var programs = [];
			programs.push(program._id);
			this.setState({
				programs: program
			});
		}
	},
	handleChange: function (event) {
		if (this.isMounted()) {
			var change = event.target;
			var attribute = '';

			switch(change.id){
				case 'item-name':
					this.setState({ name : change.value });
					break;
				case 'item-description':
					this.setState({ description : change.value });
					break;
			}
		}
	},
	handleSubmit: function () {
		var self = this;

		var newItem = {
			name: this.state.name,
			programs: this.state.programs,
			description: this.state.description,
			categories: this.state.categories,
			startDate: Date.now()
		};

		$.ajax({			
			url: '/api/items',
			method: 'post',
			data: newItem,
			success: function (item) {
				PubSub.publish('list-item-add', item);
				self.handleClear();
			}
		});
	},
	handleClear: function () {
		if (this.isMounted()) {
			this.setState({
				name: '',
				description: ''
			});
		}
	},
	render: function () {
		var name = this.state.name;
		var description = this.state.description;

		return (
			<div id="list-item-adder">
				<form className="form-horizontal">
					<div className="form-group">
						<label for="item-name" className="col-sm-2 control-label">Name</label>
						<div className="col-sm-10">
							<input 
								type="text" 
								className="form-control" 
								id="item-name"
								placeholder="Item name"
								value={ name }
								onChange={this.handleChange} />
						</div>
					</div>
					<div className="form-group">
						<label for="item-description" className="col-sm-2 control-label">Description</label>
						<div className="col-sm-10">
							<textarea 
								rows="2" 
								className="form-control" 
								id="item-description"
								placeholder="Write more information about the item here."
								value={ description } 
								onChange={this.handleChange}/>
						</div>
					</div>
					<div className="form-group">
						<label className="col-sm-2 control-label">Patterns</label>
						<div className="col-sm-10">
							<ProgramAdder />
						</div>
					</div>
					<div className="form-group">
						<label className="col-sm-2 control-label">Categories</label>
						<div className="col-sm-10">
							<CategoryAdder />
						</div>
					</div>
					<div className="form-group">
						<label className="col-sm-2 control-label">Tags</label>
						<div className="col-sm-10">
							<TagAdder />
						</div>
					</div>
				</form>

				<div className="btn-toolbar">
					<button className="btn btn-default" onClick={this.handleClear}>Clear</button>
					<button type="submit" className="btn btn-primary" onClick={this.handleSubmit}>Add</button>
				</div>
			</div>
		);
	}
});

module.exports = ListItemAdder;