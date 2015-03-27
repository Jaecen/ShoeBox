var CardSelector = React.createClass({
	getInitialState: function() {
		return {
			selectedSet: Object.keys(this.props.db).pop(),
			selectedCard: ''
		};
	},

	handleSetChanged: function(set) {
		this.setState({selectedSet: this.props.db[event.target.value]});
	},

	handleCardChanged: function(event) {
	},

	handleCardIncremented: function(event) {
	},

	handleCardDecremented: function(event) {
	},

	handleCardCommitted: function(event) {
	},

	render: function() {
		return (
			<div>
				<SetSelector
					sets={this.props.db}
					selection={this.state.selectedSet}
					onChanged={this.handleSetChanged} />

				<CardSearchBox
					selection={this.state.selectedCard}
					onChanged={this.handleCardChanged}
					onIncremented={this.handleCardIncremented}
					onDecremented={this.handleCardDecremented}
					onCommitted={this.handleCardCommitted} />
			</div>
		);
	}
});
