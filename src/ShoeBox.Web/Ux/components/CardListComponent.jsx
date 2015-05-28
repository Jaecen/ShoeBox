import React from 'react';
import CardListStore from '../stores/CardListStore';

var CardListComponent = React.createClass({
	
	getInitialState() {
		console.log('CList init state');
		
		let { cards, filters } = CardListStore.getState();
		console.log(cards, filters);
		return { cards, filters };
	},

	componentDidMount() {
		CardListStore.listen(this.onCardListUpdated)
	},

	componentWillUnmount() {
		CardListStore.unlisten(this.onCardListUpdated)
	},

	onCardListUpdated() {
		let { cards, filters } = CardListStore.getState();
		this.setState( { cards, filters } );
	},

	render() {
		console.log('CList render');

		return (
			<ul> { 
				this.state.cards.map((card) => {
					console.log('CList', card);
					return (
						<li>{ card.name }</li>
					);
				})
			} </ul>
		);
	}
});

export default CardListComponent;