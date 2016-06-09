Candidates = new Meteor.Collection( 'candidates' );

Candidates.allow({
  insert: () => true,
  update: () => true,
  remove: () => true
});


let feedbackSchema = new SimpleSchema({
  "user": {
    type: String,
    label: "The user reviewing the candidate"
  },
  "karma": {
    type: Number,
    label: "A value representing candidate score"
  },
  "stage": {
    type: Number,
    label: "The stage the review belongs"
  },
  "message": {
    type: String,
    label: "The review message"
  },
  created_at: {
    type: Number,
    autoValue: function () {
      return Math.round(Date.now() / 1000) // Mandril envoi le format / 1000 donc on garde pour unicité
    }
  }
});

let reviewSchema = new SimpleSchema({
  "user": {
    type: String,
    label: "The user reviewing the candidate"
  },
  "message": {
    type: String,
    label: "The review message"
  },
  created_at: {
    type: Number,
    autoValue: function () {
      return Math.round(Date.now() / 1000) // Mandril envoi le format / 1000 donc on garde pour unicité
    }
  }
});

let conversationSchema = new SimpleSchema({
  "user": {
    type: String,
    optional: true,
    defaultValue: "",
    label: "The user contacting the candidate"
  },
  "email": {
    type: String,
    optional: true,
    defaultValue: "",
    label: "The candidate email (if candidate)"
  },
  "message": {
    type: String,
    label: "The message"
  },
  created_at: {
    type: Number,
    optional: true,
    autoValue: function () {
      if (!this.isSet) {
        return Math.round(Date.now() / 1000) // Mandril envoi le format / 1000 donc on garde pour unicité
      }
    }
  }
});


let conversationObjSchema = new SimpleSchema({
  convId: {
    type: String,
    optional: true
  },
  messages: {
    type: [conversationSchema],
    defaultValue: [],
    optional: true
  }
})

let candidateSchema = new SimpleSchema({
  "company": {
    type: String,
    label: "The company {id} that the candidate belongs to"
  },
  picture: {type: String, optional: true},
  "firstname": {
    type: String,
    label: "The candidate's firstname"
  },
  "lastname": {
    type: String,
    label: "The candidate's lastname"
  },
  "email": {
    type: String,
    label: "The candidate's email"
  },
  "phone": {
    type: String,
    optional: true,
    label: "The candidat's phone number"
  },
  "linkedin": {
    type: String,
    optional: true,
    label: "The candidat's linkedin URL"
  },
  "tags": {
    type: [String],
    defaultValue: [],
    optional: true,
    label: "The tags attributed to the candidate"
  },
  "reviews": {
    type: [reviewSchema],
    defaultValue: [],
    optional: true,
    label: "The candidate's reviews"
  },
  "conversation": {
    type: conversationObjSchema,
    defaultValue: {},
    optional: true,
    label: "The conversation with the candidate"
  },
  "feedback": {
    type: [feedbackSchema],
    defaultValue: [],
    optional: true,
    label: "The feedbacks at different stages by different people"
  },
  "documents": {
    type: [String],
    defaultValue: [],
    optional: true
  },
  "education": {
    type: [String],
    defaultValue: [],
    optional: true
  },
  "jobs": {
    type: [String],
    defaultValue: [],
    optional: true
  },
  "stage": {
    type: Number,
    label: "The stage of the candidate application",
    autoValue: function () {
      if (this.isInsert) {
        return 1 // Default stage is applied
      }
    }
  },
  "disqualified": {
    type: Boolean,
    label: "A candidate can be disqualified at any stage",
    autoValue: function () {
      if (!this.isSet) {
        return false
      }
    }
  },
  created_at: {
    type: Number,
    optional: true,
    autoValue: function () {
      if (!this.isSet) {
        return Math.round(Date.now() / 1000) // Mandril envoi le format / 1000 donc on garde pour unicité
      }
    }
  }
});

Candidates.attachSchema( candidateSchema );
