Meteor.publish( 'candidates', function(company) {
  check(company, Match.Optional(String))

  if (this.userId || !_.isEmpty(company)) {
    let cmp = (this.userId ? Meteor.users.findOne({_id: this.userId}).company : company);

    return Candidates.find({ company: cmp });
  }
  else {
    return null;
  }
});
