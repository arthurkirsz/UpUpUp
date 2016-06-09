Meteor.publish(null, function() {
  if (this.userId) {
    return Meteor.users.find(
      {_id: this.userId},
      {fields: {company: 1, emails: 1, created_at: 1, firstname: 1, lastname: 1}});
  } else {
    return null;
  }
});

Meteor.publish( 'companyUsers', function() {
  if (this.userId) {
    let user = Meteor.users.findOne({_id: this.userId});
    return Meteor.users.find({ company: user.company });
  }
  else {
    return null;
  }
});

