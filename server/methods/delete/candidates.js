Meteor.methods({
  deleteCandidate(id) {
    check( id, String);

    try {
      Candidates.remove({ _id: id });
    } catch ( exception ) {
      throw new Meteor.Error( '500', `${ exception }` );
    }
  }

})
