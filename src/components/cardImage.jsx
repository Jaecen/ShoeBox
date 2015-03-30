var React = require('react');

module.exports = React.createClass({
	handleError: function(event) {
		// Should try to use just card.name
	},

	render: function() {
		var imageUrl = this.props.set && this.props.card
			? this.props.prefix + this.props.set.code + '/' + this.props.card.imageName + this.props.postfix
			: null;

		return (
			<img className="card-image" src={imageUrl} onError={this.handleError} />
		);
	}
});
