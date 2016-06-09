Meteor.methods({
  insertCompany(name) {
    check(name, String)

    let companyId = Companies.insert({"name": name})

    Stages.insert({"company": companyId, "order": 1, "label": "Nouveau"});
    Stages.insert({"company": companyId, "order": 2, "label": "CV examiné"});
    Stages.insert({"company": companyId, "order": 3, "label": "Evaluation téléphonique"});
    Stages.insert({"company": companyId, "order": 4, "label": "Entretien"});
    Stages.insert({"company": companyId, "order": 5, "label": "Offre"});
    Stages.insert({"company": companyId, "order": 6, "label": "Embauché"});

    return companyId;
  }
})
