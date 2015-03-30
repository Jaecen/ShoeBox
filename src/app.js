var React = require('react');
var Router = require('react-router');

var App = require('./components/app.jsx');
var Browse = require('./components/browse.jsx');
var Enter = require('./components/enter.jsx');

var Route = Router.Route;
var DefaultRoute = Router.DefaultRoute;
var RouteHandler = Router.RouteHandler;

var configuration = {
	cardDbUrl: 'http://mtgjson.com/json/AllSets.json',
	collectionLocalStorageKey: 'collection',
	imageUrlPrefix: 'http://auren:8082/',
	imageUrlPostfix: '.xlhq.jpg'
};

$.getJSON(configuration.cardDbUrl)
	.then(function(data) {
		var collection = JSON.parse(localStorage.getItem(configuration.collectionLocalStorageKey))
			|| { };

		var enterInstance = React.createClass({
			render: function() {
				return (
					<Enter
						db={data}
						collection={collection}
						imageUrlPrefix={configuration.imageUrlPrefix}
						imageUrlPostfix={configuration.imageUrlPostfix} />
				);
			}
		})

		var routes = (
			<Route name="app" path="/" handler={App}>
				<DefaultRoute handler={enterInstance} />
				<Route name="enter" handler={enterInstance} />
				<Route name="browse" handler={Browse} />
			</Route>
		);

		Router.run(routes, Router.HistoryLocation, function(Handler) {
			React.render(<Handler />, document.getElementById('appContainer'));
		});

	});
