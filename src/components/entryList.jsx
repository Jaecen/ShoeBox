var React = require('react');
var _ = require('lodash');

module.exports = React.createClass({
	render: function() {
		var entryRows = _.clone(this.props.entries)
			.reverse()
			.map(function(entry) {
				return <tr key={entry.index}>
						<td>
							<i className={('ss ss-2x ss-fw ss-grad ss-' + entry.set + ' ss-' + entry.rarity).toLowerCase()} />
						</td>
						<td>{String(entry.number) + (entry.isFoil ? ' (Foil)' : '') + (entry.isPromo ? ' (Promo)' : '')}</td>
						<td>{entry.card}</td>
						<td>{entry.quantity}</td>
					</tr>
			});

		return (
			<table className="table entries">
				{entryRows}
			</table>
		);
	}
});
