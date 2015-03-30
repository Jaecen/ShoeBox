var React = require('react');
var _ = require('lodash');
var CardSelector = require('./cardSelector.jsx');
var EntryList = require('./entryList.jsx');
var CardImage = require('./cardImage.jsx');
var EntryStore = require('../stores/EntryStore.js');

module.exports = React.createClass({
	getInitialState: function() {
		return EntryStore.getState();
	},

	componentDidMount: function() {
		EntryStore.listen(this.onChange);
	},

	componentWillUnmount: function() {
		EntryStore.unlisten(this.onChange);
	},

	onChange: function() {
		this.setState(this.getInitialState())
	},

	/*handleCardChanged: function(event) {
		this.setState({
			set: event.set,
			card: event.card,
			index: event.index
		});
	},

	handleCardCommitted: function(event) {
		var entries = this.state.entries;
		var lastEntry = _.last(entries);
		var quantity = 1;
		if(lastEntry && lastEntry.set == event.set.code && lastEntry.number == event.card.number && lastEntry.isFoil === event.isFoil && lastEntry.isPromo == event.isPromo) {
			quantity = lastEntry.quantity + 1;
			entries = _.dropRight(entries);
		}

		entries = entries.concat([{
			index: this.state.entryIndex,
			set: event.set.code,
			number: event.card.number,
			rarity: event.card.rarity,
			card: event.card.name,
			isFoil: event.isFoil,
			isPromo: event.isPromo,
			quantity: quantity
		}]);

		entries = _.takeRight(entries, 20);

		this.setState({
			entries: entries,
			entryIndex: this.state.entryIndex + 1
		});
	},*/

	render: function() {
		return (
			<div className="row">
				<button type="button" id="ExportButton" className="btn btn-defaut">Download Collection</button>
				<div className="row">
					<div className="col-md-6">
						<CardSelector
							db={this.props.db}
							set={this.state.set}
							card={this.state.card}
							index={this.state.index}
							onChanged={this.handleCardChanged}
							onCommitted={this.handleCardCommitted} />
						<div>
							<EntryList entries={this.state.entries} />
						</div>
					</div>
					<div className="col-md-6">
						<CardImage
							prefix={this.props.imageUrlPrefix}
							postfix={this.props.imageUrlPostfix}
							set={this.state.set}
							card={this.state.card} />
					</div>
				</div>
			</div>
		);
	}
});
