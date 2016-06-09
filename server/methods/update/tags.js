Meteor.methods({
  updateTag(tag) {
    check( tag, {
      _id: String,
      name: Match.Optional( String )
    });

    try {
      Tags.update( tag._id, {
        $set: tag
      });
    } catch ( exception ) {
      throw new Meteor.Error( '500', `${ exception }` );
    }
  }

})
