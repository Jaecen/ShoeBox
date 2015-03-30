var Alt = require('alt');
var CollectionActions = require('../actions/collectionActions.js');

var alt = new Alt();

class CollectionStore {
	constructor() {
	}
}

module.exports = alt.createStore(CollectionStore, 'CollectionStore');
