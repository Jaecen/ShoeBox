var Alt = require('alt');
var alt = new Alt();

class EntryActions {
	addEntry(entry) {
		this.dispatch(entry);
	}

	selectCard(selection) {
		this.dispatch(selection);
	}
}

module.exports = alt.createActions(EntryActions);
