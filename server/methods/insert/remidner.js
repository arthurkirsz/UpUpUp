Meteor.methods({
  insertReminder(content, date, candidateId, userId, type) {
    check([content, candidateId, userId], [String])
    check([date, type], [Number])

    return Reminders.insert({"user": userId, "candidate": candidateId, "content": content, "date": date, "type": type});
  }
})
