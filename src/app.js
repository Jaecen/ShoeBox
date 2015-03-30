var React = require('react');
var Router = require('react-router');

var App = require('./components/app.jsx');
var Browse = require('./components/browse.jsx');
var Enter = require('./components/enter.jsx');
var Configuration = require('./configuration.js');
var CardActions = require('./actions/cardActions.js');

var Route = Router.Route;
var DefaultRoute = Router.DefaultRoute;
var RouteHandler = Router.RouteHandler;

$.getJSON(Configuration.cardDbUrl)
	.then(function(data) {
		var collection = JSON.parse(localStorage.getItem(Configuration.collectionLocalStorageKey))
			|| { };

		CardActions.loadCards(data);

		var enterInstance = React.createClass({
			render: function() {
				return (
					<Enter
						db={data}
						collection={collection}
						imageUrlPrefix={Configuration.imageUrlPrefix}
						imageUrlPostfix={Configuration.imageUrlPostfix} />
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

/*
https://github.com/goatslacker/alt
https://reactjsnews.com/getting-started-with-flux/
*/
