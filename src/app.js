var React = require('react');
var Router = require('react-router');

var App = require('./components/app.jsx');
var Browse = require('./components/browse.jsx');
var Enter = require('./components/enter.jsx');

var Route = Router.Route;
var DefaultRoute = Router.DefaultRoute;
var RouteHandler = Router.RouteHandler;

var routes = (
	<Route name="app" path="/" handler={App}>
		<Route name="enter" handler={Enter} />
		<Route name="browse" handler={Browse} />
		<DefaultRoute handler={Enter} />
	</Route>
);

Router.run(routes, Router.HistoryLocation, function(Handler) {
	React.render(<Handler />, document.getElementById('appContainer'));
});
