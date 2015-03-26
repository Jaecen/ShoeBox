var CardSearchBox = React.createClass({
	render: function() {
		return (
			<div className="form-group">
				<label>Card:</label>
				<input type="text" id="CardSearch" className="form-control" autofocus />
			</div>
		);
	}
});