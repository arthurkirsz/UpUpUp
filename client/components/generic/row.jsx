Row = React.createClass({
  render() {
    let classes = this.props.mobile ? ' columns is-mobile ' : ' columns ';
    classes += this.props.gap === false ? ' is-gapless ' : '';

    return <div className={classes}>
      { this.props.children }
    </div>;
  }
});
