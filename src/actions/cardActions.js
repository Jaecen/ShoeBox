var Alt = require('alt');
var alt = new Alt();

class CardActions {
	loadCards(cards) {
		this.dispatch(cards);
	}
}

module.exports = alt.createActions(CardActions);
