var alt = require('../alt.js');
var CardActions = require('../actions/cardActions.js');

class CardStore {
	constructor() {
		this.sets = null;

		this.bindAction(CardActions.updateCards, this.onUpdateCards);
	}

	onUpdateCards(cards) {
		this.sets = cards;
	}
}

module.exports = alt.createStore(CardStore, 'CardStore');
