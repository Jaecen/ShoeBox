import React from 'react';
import CardListStore from '../stores/CardListStore';

var CardListItemComponent = React.createClass({
	
	render() {
		return (
			<span>{ this.props.card.name }</span>
	)};
})

export default CardListItemComponent;