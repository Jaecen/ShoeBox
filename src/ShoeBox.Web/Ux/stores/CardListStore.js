import alt from '../alt';
import CardListActions from '../actions/CardListActions'

const STATE_DONE = Symbol('STATE_DONE');
const STATE_LOADING = Symbol('STATE_LOADING');
const STATE_ERROR = Symbol('STATE_ERROR');

class CardListStore {
	constructor() {
		this.bindListeners({
			handleFilterChanged: CardListActions.filterChanged,
			handleCardSelected: CardListActions.cardSelected,
			handleListUpdated: CardListActions.listUpdated,
			handleListUpdateErrored: CardListActions.listUpdateErrored
		});

		this.cards = [];
		this.filter = [];
		this.state = STATE_DONE;
		this.status = null;

		CardListActions.filterChanged();
	}

	handleFilterChanged({ filter }) {
		this.state = STATE_LOADING;
	}

	handleCardSelected({ card }) {
		// Display the selected card
	}

	handleListUpdated({ cardList }) {
		// Update the list
		this.state = STATE_DONE;
		this.cards = cardList;
	}

	handleListUpdateErrored({ error }) {
		this.state = CardListStoreStates.ERROR;
		this.status = "Something went wrong.";
	}
}

export default alt.createStore(CardListStore, 'CardListStore');
export { STATE_DONE as STATE_DONE };
export { STATE_LOADING as STATE_LOADING };
export { STATE_ERROR as STATE_ERROR };
