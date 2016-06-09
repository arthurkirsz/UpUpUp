Meteor.methods({
  insertCandidate: function(firstname, lastname, email, phone, company) {
    check([firstname, lastname, email, company], [String])
    check(phone, Match.Optional( String ))

    let candidate = {
      "company": company,
      "firstname": firstname,
      "lastname": lastname,
      "email": email
    }
    if (!_.isEmpty(phone)) {
      candidate.phone = phone
    }

    return Candidates.insert(candidate)
  }
})
