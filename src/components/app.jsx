var React = require('react');
var Router = require('react-router');

var RouteHandler = Router.RouteHandler;
var Link = Router.Link;

module.exports = React.createClass({
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
