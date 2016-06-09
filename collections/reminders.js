Reminders = new Meteor.Collection( 'reminders' );

Reminders.allow({
  insert: () => true,
  update: () => true,
  remove: () => true
});

ReminderTypes = {}
ReminderTypes.EMAIL = 1
ReminderTypes.NOTIFICATION = 2

let reminderSchema = new SimpleSchema({
  "user": {
    type: String,
    label: "The user {id} of the reminder setter"
  },
  "candidate": {
    type: String,
    label: "The candidate {id} linked to the reminder"
  },
  "content": {
    type: String,
    label: "The reminder content"
  },
  "date": {
    type: Number,
    label: "The reminder date"
  },
  "type": {
    type: Number,
    label: "The reminder type"
  }
});

Reminders.attachSchema( reminderSchema );

if (Meteor.isServer) {
  var checkTodayNotifications = function () {
    Meteor.call("handleReminders")
  }
  var cron = new Meteor.Cron( {
    events:{
      "0 0 * * *"  : checkTodayNotifications
    }
  });
}
