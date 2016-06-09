Meteor.users.allow({
  insert: () => false,
  update: () => false,
  remove: () => false
});

Meteor.users.deny({
  insert: () => true,
  update: () => true,
  remove: () => true
});


/* User Notifications: Pour les utilisateurs de la company quand il y a des changements sur le job/candidat */
let  userNotificationsSchema = new SimpleSchema({
  content: {type: String},
  url: {type: String},
  date: {
    type: Number,
    autoValue: function () {
      return Date.now()
    }
  }
});

/* User profile (La fiche (candidat), mais côté user) */
let userProfileSchema = new SimpleSchema({
  firstname: {type: String, optional: true},
  lastname: {type: String, optional: true},
  phone: {type: String, optional: true},
  skype: {type: String, optional: true},
  notifications: {type: [userNotificationsSchema], optional: true}
});

let userSchema = new SimpleSchema({
  username: {
    type: String,
    regEx: /^[a-z0-9A-Z_]{3,15}$/,
    optional: true
  },
  firstname: {type: String, optional: true},
  lastname: {type: String, optional: true},
  company: {type: String},
  emails: {type: [Object]},
  "emails.$.address": {type: String, regEx: SimpleSchema.RegEx.Email},
  "emails.$.verified": {type: Boolean},
  profile: {type: userProfileSchema, optional: true},
  services: {type: Object, optional: true, blackbox: true},
  createdAt: {
    type: Number,
    autoValue: function () {
      return Date.now()
    }
  }
});

Meteor.users.attachSchema(userSchema);
