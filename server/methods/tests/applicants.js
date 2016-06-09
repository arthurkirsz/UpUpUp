Meteor.methods({
  'resetApplicants' : function() {
    console.log("reset")
    Applicants.remove({});
  },
  'createApplicants' : function() {
    Applicants.insert({card: {firstname: "toto", lastname: "toto", email: "toto@toto.toto"}})
    Applicants.insert({card: {firstname: "tata", lastname: "tata", email: "tata@tata.tata"}})
  }
});
