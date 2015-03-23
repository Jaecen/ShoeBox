$(document).ready(initApp);

var cardImageUrlPrefix = 'http://auren:8082/';
var cardImageUrlPostfix = '.xlhq.jpg';
var selection = null;

function initApp() {
	console.log('Fetching DB');
	$.getJSON('http://mtgjson.com/json/AllSets.json')
		.then(function(data) {
			console.log('DB loaded');
			initUi(data);
		});
}

function initUi(db) {
	console.log('Init UI');
	// Populate set dropdown
	var setSelector = $('#SetSelector');
	Object
		.keys(db)
		.map(function(key) {
			setSelector
				.append(
					$('<option />')
						.attr('value', key)
						.text(db[key].name));
		});

	var entriesContainer = $('#EntriesContainer');
	$('#CardSearch')
		.keypress(function(event) {
			var code = event.keyCode || event.which;
			if(code == 13) {	// enter
				event.preventDefault();
				console.log('Adding entry');

				if(selection === null)
					return;

				entriesContainer
					.append($('<div></div>')
					.text(selection.card.name));

				$(this).select();

			} else if(code == 43 || code == 107) {	// Plus
				console.log('Incrementing selection');
				event.preventDefault();

				if(selection.index < selection.set.cards.length) {
					updateSelection(selection.set, selection.set.cards[selection.index + 1], selection.index + 1);
					$(this).val(selection.card.name);
					$(this).select();
				}
			} else if(code == 45 || code == 109) {	// minus
				console.log('Decrementing selection');
				event.preventDefault();

				if(selection.index > 0) {
					updateSelection(selection.set, selection.set.cards[selection.index - 1], selection.index - 1);
					$(this).val(selection.card.name);
					$(this).select();
				}
			}
		})
		.keyup(function(e) {
			var code = event.keyCode || event.which;
			if(code === 13 || code === 43 || code === 107 || code === 45 || code === 109)
				return;

			console.log('Searching for new selection');
			// Handle search values
			var enteredText = $(this).val();
			var selectedSet = db[setSelector.val()];
			var selections = selectedSet
				.cards
				.map(function(card, index) {
					return {
						set: selectedSet,
						card: card,
						index: index
					}
				})
				.filter(function(match) {
					return (match.card.number && match.card.number == enteredText)
						|| (match.card.name && match.card.name == enteredText);
				});

			if(selections.length > 0)
				updateSelection(selections[0].set, selections[0].card, selections[0].index);
			else
				clearSelection();
		});
}

function clearSelection() {
	console.log('Clearing selection');
	selection = null;
}

var cardImageContainer = $('#CardImageContainer');
function updateSelection(set, card, index) {
	console.log('Updating selection');
	selection = {
		set: set,
		card: card,
		index: index
	};

	updateSelectionImage(
		selection.set.code,
		selection.card.imageName,
		function() {
			console.log('Trying alternate image');
			updateSelectionImage(selection.set.code, selection.card.name);
		});
}

function updateSelectionImage(setCode, cardName, errorHandler) {
	cardImageContainer
		.empty()
		.append(
			$('<img />')
				.attr('src', cardImageUrlPrefix + setCode + '/' + cardName + cardImageUrlPostfix)
				.on('error', function() { if(errorHandler) errorHandler(); }));
}