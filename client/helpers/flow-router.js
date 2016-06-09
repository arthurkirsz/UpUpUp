let pathFor = ( path, view ) => {
  if ( path.hash ) {
    view = path;
    path = view.hash.route;
    delete view.hash.route;
  }

  let query = view.hash.query ? FlowRouter._qs.parse( view.hash.query ) : {};
  return FlowRouter.path( path, view.hash, query );
};

Template.registerHelper( 'pathFor', pathFor );

Template.registerHelper( 'urlFor', ( path, view ) => {
  return Meteor.absoluteUrl( pathFor( path, view ).substr( 1 ) );
});

Template.registerHelper( 'currentRoute', ( route ) => {
  FlowRouter.watchPathChange();
  return FlowRouter.current().route.name === route ? 'active' : '';
});

let pathForReact = ( path, params ) => {
  //console.log( params );

  let query = params && params.query ? FlowRouter._qs.parse( params.query ) : {};
  return FlowRouter.path( path, params, query );
};

let urlFor = ( path, params ) => {
  return Meteor.absoluteUrl( pathFor( path, params ) );
};

let currentRoute = ( route ) => {
  FlowRouter.watchPathChange();
  return FlowRouter.current().route.name === route ? 'is-active' : '';
};

FlowHelpers = {
  pathFor: pathForReact,
  urlFor: urlFor,
  currentRoute: currentRoute
};
