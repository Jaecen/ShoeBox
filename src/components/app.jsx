var React = require('react');
var Router = require('react-router');
var CardActions = require('../actions/cardActions.js');

var RouteHandler = Router.RouteHandler;
var Link = Router.Link;

//var alt = require('../alt.js');
//alt.dispatcher.register(console.log.bind(console));

module.exports = React.createClass({
	componentDidMount: function() {
		CardActions.loadCards();
	},

	render: function() {
		return (
			<div className="container-fluid">
				<div className="row">
					<div className="col-md-3">
						<Link to="enter">Enter</Link>
						<Link to="browse">Browse</Link>
					</div>
					<div className="col-md-9">
						<RouteHandler />
					</div>
				</div>
			</div>
		)
	}
});
