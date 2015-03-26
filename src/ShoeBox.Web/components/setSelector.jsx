var SetSelector = React.createClass({
	getDefaultProps: function() {
		return {
			sets: []
		};
	},

	getInitialState: function() {
		return {
			selectedSet: null
		}
	}

	render: function() {
		return (
			<div className="form-group">
				<label>Set:</label>
				<select className="form-control"></select>
			</div>
		);
	}
});