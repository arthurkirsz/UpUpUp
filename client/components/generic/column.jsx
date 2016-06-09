Column = React.createClass({
  renderCol() {
    let column = {
      1: <div className="column is-1">{ this.props.children }</div>,
      2: <div className="column is-2">{ this.props.children }</div>,
      3: <div className="column is-3">{ this.props.children }</div>,
      4: <div className="column is-4">{ this.props.children }</div>,
      5: <div className="column is-5">{ this.props.children }</div>,
      6: <div className="column is-6">{ this.props.children }</div>,
      7: <div className="column is-7">{ this.props.children }</div>,
      8: <div className="column is-8">{ this.props.children }</div>,
      9: <div className="column is-9">{ this.props.children }</div>,
      10: <div className="column is-10">{ this.props.children }</div>,
      11: <div className="column is-11">{ this.props.children }</div>,
      12: <div className="column is-12">{ this.props.children }</div>,
      half: <div className="column is-half">{ this.props.children }</div>,
      third: <div className="column is-third">{ this.props.children }</div>,
      quarter: <div className="column is-quarter">{ this.props.children }</div>,
      auto: <div className="column">{ this.props.children }</div>
    };

    return column[ this.props.size ];
  },
  render() {
    return this.renderCol();
  }
});
