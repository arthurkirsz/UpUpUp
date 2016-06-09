Header = React.createClass({
  componentDidMount() {
    $('#header-toggle').on('click', function() {
      $(this).toggleClass('is-active');
      $('#header-menu').toggleClass('is-active');
    });
  },
  render() {
    return <header className="header" style={{borderBottom: "1px solid #ddd"}}>
      <div className="container is-fluid" style={{padding: "0px"}}>
        <div className="header-left">
          <a className="header-item" href={ this.props.brandLink }>
            { this.props.brand }
          </a>
        </div>
        <span id="header-toggle" className="header-toggle">
          <span></span>
          <span></span>
          <span></span>
        </span>

        { this.props.children }
      </div>
    </header>;
  }
});
