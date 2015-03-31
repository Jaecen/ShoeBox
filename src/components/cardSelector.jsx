var React = require('react');
var SetSelector = require('./setSelector.jsx');
var CardSearchBox = require('./cardSearchBox.jsx');

module.exports = React.createClass({
	getDefaultProps: function() {
		return {
			onChanged: function() { },
			onCommitted: function() { }
		};
	},

	handleSetChanged: function(event) {
		this.props.onChanged({
			set: event.set,
			card: null,
			index: null
		})
	},

	handleCardChanged: function(event) {
		this.props.onChanged({
			set: this.props.set,
			card: event.card,
			index: event.index
		});
	},

	handleCardCommitted: function(event) {
		if(this.props.card)
			this.props.onCommitted({
				set: this.props.set,
				card: this.props.card,
				index: this.props.index,
				isFoil: event.isFoil,
				isPromo: event.isPromo
			});
	},

	render: function() {
		return (
			<div>
				<SetSelector
					sets={this.props.sets}
					set={this.props.set}
					onChanged={this.handleSetChanged} />

				<CardSearchBox
					set={this.props.set}
					card={this.props.card}
					index={this.props.index}
					onChanged={this.handleCardChanged}
					onCommitted={this.handleCardCommitted} />
			</div>
		);
	}
});
