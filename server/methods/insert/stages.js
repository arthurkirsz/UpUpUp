Meteor.methods({
  seedStages(company) {
    check(company, String)
    Stages.insert({"company": company, "order": 1, "label": "Nouveau"});
    Stages.insert({"company": company, "order": 2, "label": "CV examiné"});
    Stages.insert({"company": company, "order": 3, "label": "Evaluation téléphonique"});
    Stages.insert({"company": company, "order": 4, "label": "Entretien"});
    Stages.insert({"company": company, "order": 5, "label": "Offre"});
    Stages.insert({"company": company, "order": 6, "label": "Embauché"});
  }
})
