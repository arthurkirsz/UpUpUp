Meteor.methods({
  addUser: function(email, password, company, firstname, lastname) {
    check([email, password, company, firstname, lastname], [String])
    console.log('email, password, company, firstname, lastname');
    console.log(email, password, company, firstname, lastname);

    var userId = Accounts.createUser({
      "email": email,
      "password": password,
      "company": company,
      "firstname": firstname,
      "lastname": lastname
    })

    Accounts.sendVerificationEmail(userId, email);
    return userId;
  }
})
