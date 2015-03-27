var SetSelector = React.createClass({
	getDefaultProps: function() {
		return {
			onChanged: function() { }
		}
	},

	handleChange: function(event) {
		this.props.onChanged(event.target.value);
	},

	render: function() {
		var sets = this.props.sets;
		var options =	Object
			.keys(sets)
			.map(function(set) {
				return <option value={sets[set].code}>{sets[set].name}</option>
			});

		return (
			<div className="form-group">
				<label>Set:</label>
				<select className="form-control" value={this.props.selection} onChange={this.handleChange}>
					{options}
				</select>
			</div>
		);
	}
});
