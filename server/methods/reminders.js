Meteor.methods({
  handleReminders() {
    let endOfDay = moment().endOf("day").toDate().getTime()
    let reminders = Reminders.find({"type": ReminderTypes.EMAIL, "date": { $lt: endOfDay } }).fetch();
    _.forEach(reminders, function (reminder) {
      let user = Meteor.users.findOne(reminder.user)
      let now = moment().toDate().getTime();
      let time = reminder.date - now;
      let timeout = Meteor.setTimeout(function() {
        Email.send({
          to: user.emails[0].address,
          from: "no-reply-reminder@upupup-app.fr",
          subject: "Votre rappel",
          text: reminder.content
        })
        Reminders.remove(reminder._id)
        lodash.remove(Pools.timeoutEmails, function(to) {
          if (to.reminder == reminder._id) {
            Meteor.clearTimeout(to.timeout)
            return true;
          }
          else {
            return false;
          }
        })
      }, Math.max(time, 0))
      Pools.timeoutEmails.push({"reminder": reminder._id, "timeout": timeout})
    })
  }
})
