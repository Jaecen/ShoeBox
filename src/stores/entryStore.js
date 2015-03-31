var alt = require('../alt.js');
var EntryActions = require('../actions/entryActions.js');

class EntryStore {
	constructor() {
		this.entries = [];
		this.entryIndex = 0;

		this.bindAction(EntryActions.addEntry, this.onAddEntry);
	}

	onAddEntry(entry) {
		this.entries.push(entries);
	}
}

module.exports = alt.createStore(EntryStore, 'EntryStore');
