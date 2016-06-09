Tags = new Meteor.Collection( 'tags' );

Tags.allow({
  insert: () => true,
  update: () => true,
  remove: () => true
});

Tags.deny({
  insert: () => false,
  update: () => false,
  remove: () => false
});

let TagsSchema = new SimpleSchema({
  "company": {
    type: String,
    label: "The company (id) the tag belongs to."
  },
  "name": {
    type: String,
    label: "The name of the tag."
  }
});

Tags.attachSchema( TagsSchema );
