Container = React.createClass({
  render() {
    let classes = 'container ';
    classes += this.props.fluid ? ' is-fluid ' : '';
    
    return <div className={classes}>{ this.props.children }</div>;
  }
});
