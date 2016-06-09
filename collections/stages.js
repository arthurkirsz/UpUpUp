Stages = new Meteor.Collection("stages");

Companies.allow({
  insert: () => true,
  update: () => true,
  remove: () => true
})

let StagesSchema = new SimpleSchema({
  company: {
    type: String,
    label: "Id de la company"
  },
  order: {
    type: Number,
    label: "Ordre dans lequel doit apparaitre le stage "
  },
  label: {
    type: String,
    label: "Nom du stage"
  },
  created_at: {
    type: Number,
    autoValue: function () {
      return Date.now()
    }
  }
});

Stages.attachSchema(StagesSchema)
