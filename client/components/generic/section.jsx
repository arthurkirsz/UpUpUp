Section = React.createClass({
  render() {
    let _background = this.props.background || 'transparent';
    let style = {background: _background};
    return <section className="section" style={style}>{ this.props.children }</section>;
  }
});
