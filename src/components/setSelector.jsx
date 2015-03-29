var SetSelector = React.createClass({
	getDefaultProps: function() {
		return {
			onChanged: function() { }
		}
	},

	handleChange: function(event) {
		this.props.onChanged({
			set: this.props.sets[event.target.value]
		});
	},

	render: function() {
		var sets = this.props.sets;
		var options =	Object
			.keys(sets)
			.map(function(set, index) {
				return <option key={index} value={sets[set].code}>{sets[set].name}</option>
			});

		return (
			<div className="form-group">
				<label>Set:</label>
				<select className="form-control" value={this.props.set.code} onChange={this.handleChange}>
					{options}
				</select>
			</div>
		);
	}
});
