Meteor.publish('tags', function() {
  if (this.userId) {
    let user = Meteor.users.findOne({_id: this.userId});
    return Tags.find({company: user.company});
  }
  else {
    return null;
  }
})
