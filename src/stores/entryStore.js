var Alt = require('alt');
var EntryActions = require('../actions/entryActions.js');
var CardActions = require('../actions/cardActions.js');
var CardStore = require('./cardStore.js');

var alt = new Alt();

class EntryStore {
	constructor() {
		this.set = null;
		this.card = null;
		this.index = null;
		this.entries = [];
		this.entryIndex = 0;

		this.bindListeners({
			handleLoadCards: CardActions.LOAD_CARDS,
			handleAddEntry: EntryActions.ADD_ENTRY,
			handleSelectCard: EntryActions.SELECT_CARD,
		});
	}

	handleLoadCards(cards) {
		this.set = cards[Object.keys(cards).pop()];
	}

	handleAddEntry(entry) {
		this.entries.push(entries);
	}

	handleSelectCard(selection) {
		this.set = selection.set;
		this.card = selection.card;
		this.index = selection.index;
	}
}

module.exports = alt.createStore(EntryStore, 'EntryStore');
