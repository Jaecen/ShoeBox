var alt = require('../alt.js');

class SelectionActions {
	constructor() {
		this.generateActions(
			'selectCard');
	}
}

module.exports = alt.createActions(SelectionActions);
