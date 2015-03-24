$(document).ready(initApp);

var cardImageUrlPrefix = 'http://auren:8082/';
var cardImageUrlPostfix = '.xlhq.jpg';
var selection = null;
var collectionKey = "collection";
var lastEntry = null;

function initApp() {
	console.log('Fetching DB');
	$.getJSON('http://mtgjson.com/json/AllSets.json')
		.then(function(data) {
			console.log('DB loaded');
			initUi(data, JSON.parse(localStorage.getItem(collectionKey)) || {});
		});
}

function initUi(db, collection) {
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

	$('#ExportButton')
		.click(function() {
			var uriContent = "data:application/octet-stream," + encodeURIComponent(JSON.stringify(collection));
			var download = window.open(uriContent, "Collection Download");
			download.focus();
		});

	var entriesContainer = $('#EntriesContainer');
	$('#CardSearch')
		.focus()
		.keypress(function(event) {
			if(selection === null)
				return;

			if(event.which === 13 || event.which === 10 || event.which === 42) {	// enter, shift+enter, num *
				event.preventDefault();
				console.log('Adding entry');

				var isFoil = event.shiftKey;
				var isPromo = event.which === 42;
				var entry = addEntry(collection, selection.set, selection.card, isFoil, isPromo);
				var entrySymbolCssClass = ('ss-' + selection.set.code + ' ss-' + selection.card.rarity).toLowerCase();

				if(lastEntry !== null && lastEntry.set == selection.set && lastEntry.card == selection.card && lastEntry.isFoil === isFoil && lastEntry.isPromo == isPromo) {
					lastEntry.count++;
				}
				else
					lastEntry = {
						set: selection.set,
						card: selection.card,
						isFoil: isFoil,
						isPromo: isPromo,
						count: 1
					};

				if(lastEntry.count > 1)
					$('#Entries tbody tr').first().remove();

				$('#Entries')
					.prepend($(
						'<tr> \
							<td><span class="ss ss-2x ss-fw ' + entrySymbolCssClass + '"></span></td> \
							<td>' + selection.card.number + '</td> \
							<td>' + selection.card.name + (isFoil ? ' (Foil)' : '') + (isPromo ? ' (Promo)' : '') + '</td> \
							<td>' + lastEntry.count + '</td>'));

				// Only show last 50
				$('#Entries tbody tr:gt(49)').remove();

				$(this).select();

			} else if(event.which == 43 || event.which == 107) {	// Plus
				console.log('Incrementing selection');
				event.preventDefault();
				adjustSelection($(this), + 1);
			} else if(event.which == 45 || event.which == 109) {	// minus
				console.log('Decrementing selection');
				event.preventDefault();
				adjustSelection($(this), - 1);
			}
		})
		.keyup(function(event) {
			if([10, 13, 42, 43, 45, 107, 109].some(function(code) { return code === event.which; }))
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
						|| (match.card.name && match.card.name.toLowerCase() == enteredText.toLowerCase());
				});

			if(selections.length > 0) {
				if(selection === null || selections[0].card !== selection.card)
					updateSelection(selections[0].set, selections[0].card, selections[0].index);
			}
			else if(selection !== null)
				clearSelection();
		});
}

function adjustSelection($control, amount) {
	var value = $control.val();

	if(isNaN(value)) {
		var targetIndex = selection.index + amount;
		if(targetIndex > 0 && targetIndex <= selection.set.cards.length) {
			updateSelection(selection.set, selection.set.cards[targetIndex], targetIndex);
			$control.val(selection.card.name);
			$control.select();
		}
	} else {
		var maxCardNumber = selection.set.cards.reduce(function(acc, card) {
			return isNaN(card.number) || Number(card.number) <= acc
				? acc
				: Number(card.number);
		}, 0);

		var targetCardNumber = Number(selection.card.number) + amount;
		if(targetCardNumber > 0 && targetCardNumber <= maxCardNumber) {
			var next = selection.set.cards
				.filter(function(card) {
					return Number(card.number) === targetCardNumber;
				})
				.map(function(card, index) {
					return {
						card: card,
						index: index
					}
				});

			if(next.length > 0) {
				updateSelection(selection.set, next[0].card, next[0].index);
				$control.val(next[0].card.number);
				$control.select();
			}
		}
	}
}

function clearSelection() {
	console.log('Clearing selection');
	selection = null;

	$('#CardImage').hide();
}

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
	$('#CardImage')
		.attr('src', cardImageUrlPrefix + setCode + '/' + cardName + cardImageUrlPostfix)
		.on('error', function() { if(errorHandler) errorHandler(); })
		.show();
}

function addEntry(collection, set, card, foil, promo) {
	var key = set.code + '.' + (card.number || card.name);

	var entry = (collection[key] || { normal: 0, promo: 0, foil: 0, foilPromo: 0 });
	if(foil && promo)
		entry.foilPromo++;
	else if(foil)
		entry.foil++;
	else if(promo)
		entry.promo++;
	else
		entry.normal++;

	collection[key] = entry;

	console.log(entry);

	return entry;
}

function saveCollection(collection) {
	localStorage.setItem(collectionKey, JSON.stringify(collection));
}