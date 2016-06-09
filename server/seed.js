Meteor.startup(function () {

  // Companies //
  console.info("companies seeding")
  if (Companies.find().count() < 2) {
    Companies.insert({"name": "Google INC"})
    Companies.insert({"name": "Crapple INC"})
  }

  // Stages //
  console.info("stages seeding")
  if (Stages.find().count() == 0) {
    let company = Companies.find().fetch()[0]._id;
    Stages.insert({"company": company, "order": 1, "label": "Nouveau"});
    Stages.insert({"company": company, "order": 2, "label": "CV examiné"});
    Stages.insert({"company": company, "order": 3, "label": "Evaluation téléphonique"});
    Stages.insert({"company": company, "order": 4, "label": "Entretien"});
    Stages.insert({"company": company, "order": 5, "label": "Offre"});
    Stages.insert({"company": company, "order": 6, "label": "Embauché"});
  }

  // Users //
  console.info("users seeding")
  if (Meteor.users.find().count() < 2) {
    var user1 = {name: 'Admin',email: 'admin@example.com', password: "password",company: Companies.find().fetch()[0]._id, "firstname": "Jean", "lastname": "Robert"};
    var user2 = {name: 'Manager',email: 'manager@example.com', password: "password",company: Companies.find().fetch()[1]._id, "firstname": "Aristote", "lastname": "Dupont"};
    Accounts.createUser(user1);
    Accounts.createUser(user2);
    Meteor.users.find({}).fetch().forEach(function(user) {
      Accounts.addEmail(user._id, user.emails[0].address, true);
    })
  }

  // Users //
  console.info("candidates seeding")
  if (Candidates.find().count() < 2) {
    let _company = Companies.find().fetch()[0]._id;
    var cand = {
      company: _company,
      firstname: "Robert",
      lastname: "LE T-REX",
      email: "email",
      phone: "email"
    };
    Candidates.insert(cand);
  }

  // Tags //
  console.info("tags seeding")
  if (Tags.find().count() < 3) {
    let _company = Companies.find().fetch()[0]._id;

    var tag1 = {name: 'Designer', company: _company};
    var tag2 = {name: 'Developer', company: _company};
    var tag3 = {name: 'Importants', company: _company};

    Tags.insert(tag1);
    Tags.insert(tag2);
    Tags.insert(tag3);
  }
});
