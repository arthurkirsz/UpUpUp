AppHeader = React.createClass({
  mixins: [ ReactMeteorData ],
  getMeteorData() {
    return {
      brandLink: !!Meteor.user() ? '/' : '/login',
      user: Meteor.user()
    };
  },
  render() {
    return <Header brandLink={ this.data.brandLink } brand="UPUPUP">
      { this.props.hasUser ? <AuthenticatedNavigation user={ this.data.user } /> : <PublicNavigation /> }
    </Header>
  }
});
