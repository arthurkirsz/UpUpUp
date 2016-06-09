FormControl = React.createClass({
  render() {
    let classes = 'control';
    classes += this.props.icon ? ' has-icon ' : '';
    return <div className={classes}>
      { this.props.children }
      { this.props.icon ? <i className={`fa fa-${this.props.icon}`}></i> : ''}
    </div>;
  }
});
