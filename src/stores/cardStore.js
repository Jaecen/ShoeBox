var Alt = require('alt');
var CardActions = require('../actions/cardActions.js');

var alt = new Alt();

class CardStore {
	constructor() {
		this.db = null;

		this.bindListeners({
			handleLoadCards: CardActions.LOAD_CARDS
		});
	}

	handleLoadCards(cards) {
		this.db = cards;
	}
}

module.exports = alt.createStore(CardStore, 'CardStore');
