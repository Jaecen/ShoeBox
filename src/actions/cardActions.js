var alt = require('../alt.js');
var Configuration = require('../configuration.js');

class CardActions {
	constructor() {
		this.generateActions(
			'updateCards',
			'loadCardsFailed');
	}

	loadCards() {
		this.dispatch();

		fetch(Configuration.cardDbUrl)
			.then(function(response) {
				return response.json();
			})
			.then((function(data) {
				this.actions.updateCards(data);
			}).bind(this))
			.catch((function(error) {
				this.actions.loadCardsFailed(error);
			}).bind(this));
	}
}

module.exports = alt.createActions(CardActions);
