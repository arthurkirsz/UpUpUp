const authenticatedRedirect = () => {
  if ( !Meteor.loggingIn() && !Meteor.userId() ) {
    FlowRouter.go( 'login' );
  }
};

const authenticatedRoutes = FlowRouter.group({
  name: 'authenticated',
  triggersEnter: [ authenticatedRedirect ]
});

authenticatedRoutes.route( '/', {
  name: 'index',
  action() {
    ReactLayout.render( App, { yield: <Index /> } );
  }
});

authenticatedRoutes.route( '/logout', {
  name: 'logout',
  action() {
    Meteor.logout();
    FlowRouter.go( 'login' );
  }
});

authenticatedRoutes.route( '/tags', {
  name: 'tags',
  action() {
    ReactLayout.render( App, { yield: <TagsList /> } );
  }
});

authenticatedRoutes.route( '/candidates', {
  name: 'candidates',
  action() {
    ReactLayout.render( App, { yield: <CandidatesList /> } );
  }
});

authenticatedRoutes.route( '/candidates/:id', {
  name: 'candidateDetail',
  action(params) {
    ReactLayout.render( App, { yield: <CandidateDetail id={ params.id } /> } );
  }
});

authenticatedRoutes.route('/candidate/create', {
  name: 'candidatesCreate',
  action() {
    ReactLayout.render(App, {yield: <CandidateForm />})
  }
})

authenticatedRoutes.route('/candidate/:id/update', {
  name: 'candidatesEdit',
  action(params) {
    ReactLayout.render(App, {yield: <CandidateForm {...params} />})
  }
})
