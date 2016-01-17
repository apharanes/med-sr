var React = require('react');
var _ = require('lodash');
var PubSub = require('pubsub-js');

var CategoriesListAdder = React.createClass({
	getInitialState: function () {
		return {
			newItem: {}
		}
	},
	handleChange: function (event) {
		var change = event.target;
		var attribute = '';

		switch(change.id){
			case 'category-name':				
				this.setState({ name : change.value });
				break;
			case 'category-description':				
				this.setState({ description : change.value });
				break;
		}
	},
	handleSubmit: function () {
		var self = this;

		var newItem = {
			name: this.state.name,
			description: this.state.description
		};

		$.ajax({			
			url: '/api/categories',
			method: 'post',
			data: newItem,
			success: function (category) {
				PubSub.publish('categories:list-item-add', category);
				self.handleClear();
			},
			error: function (err) {
				console.log(err);
			}
		});
	},
	handleClear: function () {
		this.setState({
			name: '',
			description: ''
		});
	},
	render: function () {
		var name = this.state.name;
		var description = this.state.description;

		return (
			<div id="list-item-adder">
				<form className="form-horizontal">			
					<div className="form-group">
						<label className="col-sm-2 control-label">Name</label>
						<div className="col-sm-10">
							<input 
								type="text" 
								className="form-control" 
								id="category-name"
								placeholder="Category name"
								value={ name }
								onChange={this.handleChange} />
						</div>
					</div>	
					<div className="form-group">
						<label className="col-sm-2 control-label">Description</label>
						<div className="col-sm-10">
							<input 
								type="number" 
								className="form-control" 
								id="category-description"
								placeholder="Write a description for this category"
								value={ description }
								onChange={this.handleChange} />
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

module.exports = CategoriesListAdder;