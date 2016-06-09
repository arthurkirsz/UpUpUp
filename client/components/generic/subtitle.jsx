Subtitle = React.createClass({
  renderSubtitle() {
    let headers = {
      1: <h1 className="subtitle is-1">{ this.props.children }</h1>,
      2: <h2 className="subtitle is-2">{ this.props.children }</h2>,
      3: <h3 className="subtitle is-3">{ this.props.children }</h3>,
      4: <h4 className="subtitle is-4">{ this.props.children }</h4>,
      5: <h5 className="subtitle is-5">{ this.props.children }</h5>,
      6: <h6 className="subtitle is-6">{ this.props.children }</h6>
    };

    return headers[ this.props.size ];
  },
  render() {
    return this.renderSubtitle();
  }
});
