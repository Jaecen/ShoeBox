var alt = require('../alt.js');
var CollectionActions = require('../actions/collectionActions.js');

class CollectionStore {
	constructor() {
		this.collection = JSON.parse(localStorage.getItem(Configuration.collectionLocalStorageKey)) || { };
	}
}

module.exports = alt.createStore(CollectionStore, 'CollectionStore');
