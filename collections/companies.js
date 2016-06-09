Companies = new Meteor.Collection("companies");

Companies.allow({
  insert: () => true,
  update: () => true,
  remove: () => true
})

let CompaniesSchema = new SimpleSchema({
  name: {
    type: String,
    label: "Nom de votre entreprise"
  },
  created_at: {
    type: Number,
    autoValue: function () {
      return Date.now()
    }
  },
  plan: {
    type: String,
    optional: true
  }
});

Companies.attachSchema(CompaniesSchema)
