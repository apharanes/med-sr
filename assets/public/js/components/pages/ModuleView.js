var React = require('react');
var _ = require('lodash');

var DashboardModule = require('./DashboardModule');
var ItemsModule = require('./ItemsModule');
var CalendarModule = require('./CalendarModule');
var ProgramsModule = require('./ProgramsModule');
var SchedulesModule = require('./SchedulesModule');
var CategoriesModule = require('./CategoriesModule');
var TagsModule = require('./TagsModule');

var ModuleView = React.createClass({
	render: function () {
		var dashboardModule = <DashboardModule />;
		var itemsModule = <ItemsModule />;
		var calendarModule = <CalendarModule />;
		var programsModule = <ProgramsModule />;
		var schedulesModule = <SchedulesModule />;
		var categoriesModule = <CategoriesModule />;
		var tagsModule = <TagsModule />;

		switch (this.props.module.key){
			case 'dashboard': return dashboardModule;
			case 'items': return itemsModule;
			case 'calendar': return calendarModule;
			case 'programs': return programsModule;
			case 'schedules': return schedulesModule;
			case 'categories': return categoriesModule;
			case 'tags': return tagsModule;
			default: return itemsModule;
		}
	}
});

module.exports = ModuleView;