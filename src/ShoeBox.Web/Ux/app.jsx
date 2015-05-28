import React from 'react';
import CardListComponent from './components/CardListComponent.jsx';

console.log(document.getElementById('AppRoot'));

React.render(
	<CardListComponent />,
	document.getElementById('AppRoot'));