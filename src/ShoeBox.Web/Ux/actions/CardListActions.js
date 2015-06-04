import alt from '../alt';
import fetch from 'isomorphic-fetch'

class CardListActions {
	filterChanged(filter) {
		console.log('CLA filterChanged', filter);
		this.dispatch();

		fetch('cards?filter=[["name","=","Naturalize"]]')
			.then(response => {
				if(response.status !== 200) {
					this.actions.listUpdateErrored({ 
						message: 'HTTP response is not success. Status code: ' + response.status
					});
					return;
				}

				response
					.json()
					.then(data => {
						this.actions.listUpdated(data.result);
					});
			})
			.catch(err => {
				this.actions.listUpdateErrored({
					message: 'Fetch error: ' + err
				});
			});
	}

	cardSelected(card) {
		console.log('CLA cardSelected', card);
		this.dispatch({card});
	}

	listUpdated(cardList) {
		console.log('CLA listUpdated', cardList);
		this.dispatch({cardList});
	}

	listUpdateErrored(error) {
		console.log('CLA listUpdateErrored', error);
		this.dispatch({error});
	}
}

export default alt.createActions(CardListActions);