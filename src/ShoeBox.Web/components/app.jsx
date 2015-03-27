var App = React.createClass({
	render: function() {
		return (
			<div className="container-fluid">
				<div className="row">
					<div className="col-md-12">
						<button type="button" id="ExportButton" className="btn btn-defaut">Download Collection</button>
					</div>
				</div>
				<div className="row">
					<div className="col-md-6">
						<CardSelector db={this.props.db} />
						<div>
							<EntryList />
						</div>
					</div>
					<div className="col-md-6">
						<CardImage />
					</div>
				</div>
			</div>
		);
	}
});
