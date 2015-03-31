var alt = require('../alt.js');
var selectionActions = require('../actions/selectionActions.js');
var cardActions = require('../actions/cardActions.js');

class SelectionStore {
	constructor() {
		this.set = null;
		this.card = null;
		this.index = null;

		this.bindAction(selectionActions.selectCard, this.onSelectCard);
		this.bindAction(cardActions.updateCards, this.onUpdateCards);
	}

	onUpdateCards(cards) {
		this.set = cards[Object.keys(cards).pop()];
	}

	onSelectCard(selection) {
		this.set = selection.set;
		this.card = selection.card;
		this.index = selection.index;
	}
}

module.exports = alt.createStore(SelectionStore, 'SelectionStore');
