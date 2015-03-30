var EntryActions = Alt.createActions(function() {
	addEntry(setCode, cardNumber, isFoil, isPromo) {
		this.dispatch(setCode, cardNumber, isFoil, isPromo);
	}
})
