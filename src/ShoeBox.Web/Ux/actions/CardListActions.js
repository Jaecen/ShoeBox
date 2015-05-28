import alt from '../alt';

class CardListActions {
	applyFilter(filter) {
		this.dispatch({ filter });
	}
}

export default alt.createActions(CardListActions);