Meteor.publish( 'reminders', function() {

  if (this.userId) {
    return Reminders.find({ "user": this.userId });
  }
  else {
    return null;
  }
});
