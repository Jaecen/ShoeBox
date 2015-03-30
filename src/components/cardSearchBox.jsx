var React = require('react');

module.exports = React.createClass({
	getDefaultProps: function() {
		return {
			onCommitted: function() { },
			onChanged: function() { }
		};
	},

	getInitialState: function() {
		return {
			entry: ''
		};
	},

	handleKeyPress: function(event) {
		if(event.which === 10 || event.which === 13 || event.which === 42) {	// enter, shift+enter, num *
			if(this.props.card) {
				this.setState({
					selectEntry: true
				});
				this.props.onCommitted({
					card: this.props.card,
					isFoil: event.shiftKey,
					isPromo: event.which === 42
				});
			}

			event.preventDefault();
		} else if(event.which == 43 || event.which == 107) {	// Plus
			var result = this.adjustSelection.call(this, event.target.value, +1);
			if(result) {
				this.setState({
					entry: result.entry,
					selectEntry: true
				});
				this.props.onChanged({
					card: result.card,
					index: result.index
				});
			}

			event.preventDefault();
		} else if(event.which == 45 || event.which == 109) {	// minus
			var result = this.adjustSelection.call(this, event.target.value, -1);
			if(result) {
				this.setState({
					entry: result.entry,
					selectEntry: true
				});
				this.props.onChanged({
					card: result.card,
					index: result.index
				});
			}
			event.preventDefault();
		}
	},

	handleChange: function(event) {
		// Search for the entered value
		var selectedSet = this.props.set;
		var searchValue = event.target.value;
		this.setState({
			entry: searchValue,
			selectEntry: false
		});

		var selections = selectedSet
			.cards
			.map(function(card, index) {
				return {
					set: selectedSet,
					card: card,
					index: index
				}
			})
			.filter(function(match) {
				return (match.card.number && match.card.number == searchValue)
					|| (match.card.name && match.card.name.toLowerCase() == searchValue.toLowerCase());
			});

		if(selections.length > 0) {
			if(this.props.card != selections[0].card)
				this.props.onChanged({
					card: selections[0].card,
					index: selections[0].index
				});
		}	else {
			if(this.props.card)
				this.props.onChanged({
					card: null,
					index: null
				});
		}
	},

	adjustSelection: function(value, amount) {
		// Increment/decrement selection by name or number, based on whats in the search box
		if(isNaN(value)) {
			var targetIndex = this.props.index + amount;
			if(targetIndex > 0 && targetIndex <= this.props.set.cards.length) {
				return {
					card: this.props.set.cards[targetIndex],
					index: targetIndex,
					entry: this.props.set.cards[targetIndex].name
				};
			}
		} else {
			var maxCardNumber = this.props.set.cards
				.reduce(
					function(acc, card) {
						return isNaN(card.number) || Number(card.number) <= acc
							? acc
							: Number(card.number);
					},
					0);

			var targetCardNumber = Number(this.props.card.number) + amount;
			if(targetCardNumber > 0 && targetCardNumber <= maxCardNumber) {
				var matches = this.props.set.cards
					.filter(function(card) {
						return Number(card.number) === targetCardNumber;
					})
					.map(function(card, index) {
						return {
							card: card,
							index: index
						}
					});

				if(matches.length > 0)
					return {
						card: matches[0].card,
						index: matches[0].index,
						entry: String(targetCardNumber)
					};
			}
		}
	},

	componentDidUpdate: function(prevProps, prevState){
		if(this.state.selectEntry) {
			React.findDOMNode(this.refs.searchTextBox).select();
		}
	},

	render: function() {
		return (
			<div className="form-group">
				<label>Card:</label>
				<input type="text" ref="searchTextBox" className="form-control" autoFocus="true" value={this.state.entry} onKeyPress={this.handleKeyPress} onChange={this.handleChange} />
			</div>
		);
	}
});
