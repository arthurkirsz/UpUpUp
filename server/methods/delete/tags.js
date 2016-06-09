Meteor.methods({
  deleteTag(id) {
    check( id, String);

    try {
      Tags.remove({ _id: id });
    } catch ( exception ) {
      throw new Meteor.Error( '500', `${ exception }` );
    }
  }

})
