PublicNavigation = React.createClass({
  componentDidMount(){
    $('#header-toggle').removeClass('is-active');
    $('#header-menu').removeClass('is-active');
  },
  render() {
    return <div id="header-menu" className="header-right header-menu">
      <a className="header-item" href="/login">
        Connexion
      </a>
      <a className="header-item" href="/signup">
        Inscription
      </a>
    </div>;
  }
});
