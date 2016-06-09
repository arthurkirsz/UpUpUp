const publicRedirect = () => {
  if ( Meteor.userId() ) {
    // After login, we redirect to index
    FlowRouter.go( 'index' );
  }
};

const publicRoutes = FlowRouter.group({
  name: 'public',
  triggersEnter: [ publicRedirect ]
});

publicRoutes.route( '/login', {
  name: 'login',
  action() {
    ReactLayout.render( App, { yield: <Login /> } );
  }
});

publicRoutes.route( '/signup', {
  name: 'signup',
  action() {
    ReactLayout.render( App, { yield: <Signup /> } );
  }
});

publicRoutes.route( '/recover-password', {
  name: 'recoverPassword',
  action() {
    ReactLayout.render( App, { yield: <RecoverPassword /> } );
  }
});

publicRoutes.route( '/reset-password/:token', {
  name: 'resetPassword',
  action(params) {
    ReactLayout.render( App, { yield: <ResetPassword token={ params.token } /> } );
  }
});
