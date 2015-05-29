import React from 'react';
import CardListStore from '../stores/CardListStore';

let CardListComponent = React.createClass({
	getInitialState() {
		let { cards, filter, state, status } = CardListStore.getState();;
		
		return { 
			cards, 
			filter, 
			state, 
			status 
		};
	},

	componentDidMount() {
		CardListStore.listen(this.onChange)
	},

	componentWillUnmount() {
		CardListStore.unlisten(this.onChange)
	},

	onChange(updatedState) {
		console.log("CList onChange", updatedState);
		let { cards, filter, state, status } = updatedState;
		this.setState({ cards, filter, state, status });
	},

	render() {
		console.log('CList render', this.state);
		return (
			<ul> { 
				this.state.cards.map((card, index) => {
					console.log('CList render', card);
					return (
						<li key={index}>{ card.name }</li>
					);
				})
			} </ul>
		);
	}
});

export default CardListComponent;