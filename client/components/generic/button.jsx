Button = React.createClass({
  render() {
    let classes = '';
    classes += this.props.outlined ? ' is-outlined ' : '';
    classes += this.props.loading ? ' is-loading ' : '';
    classes += this.props.disabled ? ' is-disabled ' : '';
    classes += this.props.style ? ` is-${ this.props.style } ` : '';
    classes += this.props.size ? ` is-${ this.props.size } ` : '';

    if ( this.props.href ) {
      return <a href={ this.props.href } className={ `button ${ classes }` }>
        { this.props.children }
      </a>;
    } else {
      return <button className={ `button ${ classes }`} onClick={this.props.onClick}>
        { this.props.children }
      </button>;
    }
  }
});
