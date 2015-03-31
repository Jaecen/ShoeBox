var React = require('react');
var _ = require('lodash');

var EntryStore = require('../stores/entryStore.js');
var CardStore = require('../stores/cardStore.js');
var SelectionStore = require('../stores/selectionStore.js');

var SelectionActions = require('../actions/selectionActions.js');

var CardSelector = require('./cardSelector.jsx');
var EntryList = require('./entryList.jsx');
var CardImage = require('./cardImage.jsx');

var Configuration = require('../configuration.js');

module.exports = React.createClass({
	getInitialState: function() {
		return {
			entryStore: EntryStore.getState(),
			cardStore: CardStore.getState(),
			selectionStore: SelectionStore.getState(),
		};
	},

	componentDidMount: function() {
		EntryStore.listen(this.onEntryStoreChange);
		CardStore.listen(this.onCardStoreChange);
		SelectionStore.listen(this.onSelectionStoreChange);
	},

	componentWillUnmount: function() {
		EntryStore.unlisten(this.onEntryStoreChange);
		CardStore.unlisten(this.onCardStoreChange);
		SelectionStore.unlisten(this.onSelectionStoreChange);
	},

	onEntryStoreChange: function() {
		this.setState({
			entryStore: EntryStore.getState()
		});
	},

	onCardStoreChange: function() {
		this.setState({
			cardStore: CardStore.getState()
		});
	},

	onSelectionStoreChange: function() {
		this.setState({
			selectionStore: SelectionStore.getState()
		});
	},

	handleCardChanged: function(event) {
		SelectionActions.selectCard(event);
	},

	handleCardCommitted: function(event) {
		/*var entries = this.state.entries;
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
		});*/
	},

	render: function() {
		return (
			<div className="row">
				<button type="button" id="ExportButton" className="btn btn-defaut">Download Collection</button>
				<div className="row">
					<div className="col-md-6">
						<CardSelector
							sets={this.state.cardStore.sets}
							set={this.state.selectionStore.set}
							card={this.state.selectionStore.card}
							index={this.state.selectionStore.index}
							onChanged={this.handleCardChanged}
							onCommitted={this.handleCardCommitted} />
						<div>
							<EntryList entries={this.state.entryStore.entries} />
						</div>
					</div>
					<div className="col-md-6">
						<CardImage
							prefix={Configuration.imageUrlPrefix}
							postfix={Configuration.imageUrlPostfix}
							set={this.state.selectionStore.set}
							card={this.state.selectionStore.card} />
					</div>
				</div>
			</div>
		);
	}
});
