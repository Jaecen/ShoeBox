import alt from '../alt';
import CardListActions from '../actions/CardListActions'

class CardListStore {
	constructor() {
		this.bindListeners({
			handleApplyFilter: CardListActions.applyFilter
		});

		console.log('Store ctor');
		
		this.cards = [{name: 'The First'}];
		this.filters = [];
	}

	handleApplyFilter({ filter }) {
		this.filters.push(filter);
	}
}

export default alt.createStore(CardListStore, 'CardListStore');