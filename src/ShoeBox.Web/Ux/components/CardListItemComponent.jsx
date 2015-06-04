import React from 'react';

let CardListItemComponent = React.createClass({
	render() {
		return (
			<span>{ this.props.name }</span>
		);
	}
});

export default CardListItemComponent;