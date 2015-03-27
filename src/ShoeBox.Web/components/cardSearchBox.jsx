var CardSearchBox = React.createClass({
	getDefaultProps: function() {
		return {
			onCommitted: function() { },
			onIncremented: function() { },
			onDecremented: function() { },
			onChanged: function() { }
		};
	},

	handleKeyPress: function(event) {
		if(event.which === 10 || event.which === 13 || event.which === 42) {	// enter, shift+enter, num *
			this.props.onCommitted({
				value: event.target.value,
				isFoil: event.shiftKey,
				isPromo: event.which === 42
			});

			event.preventDefault();
		} else if(event.which == 43 || event.which == 107) {	// Plus
			this.props.onIncremented({
				value: event.target.value
			});

			event.preventDefault();
		} else if(event.which == 45 || event.which == 109) {	// minus
			this.props.onDecremented({
				value: event.target.value
			});

			event.preventDefault();
		}
	},

	handleChange: function(event) {
		this.props.onChanged({
			value: event.target.value
		});
	},

	render: function() {
		return (
			<div className="form-group">
				<label>Card:</label>
				<input type="text" className="form-control" autoFocus="true" value={this.props.selection} onKeyPress={this.handleKeyPress} onChange={this.handleChange} />
			</div>
		);
	}
});
