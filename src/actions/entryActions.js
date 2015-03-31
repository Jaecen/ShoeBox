var alt = require('../alt.js');

class EntryActions {
	constructor() {
		this.generateActions(
			'addEntry');
	}
}

module.exports = alt.createActions(EntryActions);
