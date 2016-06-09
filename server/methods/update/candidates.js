Meteor.methods({
  updateCandidate: function(candidateId, firstname, lastname, email, phone, linkedin, company) {
    check([candidateId, firstname, lastname, email, company, linkedin], [String])
    check(phone, Match.Optional( String ))

    let candidate = {
      "company": company,
      "firstname": firstname,
      "lastname": lastname,
      "email": email,
      "linkedin": linkedin
    }
    if (!_.isEmpty(phone)) {
      candidate.phone = phone
    }
    return Candidates.update(candidateId, {$set: candidate})
  },
  updateStage: function(candidateId, stage) {
    check([candidateId, stage], [String]);
    return Candidates.update(candidateId, {$set: {stage: stage}})
  },
  disqualify: function(candidateId) {
    check(candidateId, String);
    return Candidates.update(candidateId, {$set: {disqualified: true}})
  },
  undisqualify: function(candidateId) {
    check(candidateId, String);
    return Candidates.update(candidateId, {$set: {disqualified: false}})
  },
  scoreCandidate: function(candidateId, userId, reasons, karma) {
    check([candidateId, userId, reasons], [String]);
    check(karma, Number);
    let candidate = Candidates.findOne(candidateId);

    let document = {
      "user": userId,
      "karma": parseInt(karma),
      "stage": candidate.stage,
      "message": reasons
    }

    let feedbackRecord = _.some(candidate.feedback, function(feedback){
        return feedback.user == userId && feedback.stage == candidate.stage
    });

    if(!feedbackRecord)
      return Candidates.update(candidateId, {$push: {feedback: document} })
    else
      throw new Meteor.Error(400, 'Vous avez déjà voté pour le candidat à cette étape', 'Error 400 : User has already made a feedback for this candidate at this stage');
  },
  addTagToCandidate(tag, candidateId, company) {
    check([tag, candidateId, company],  [String]);

    let tagId;
    let tagObj = Tags.findOne({name: tag, company: company})
    if (_.isEmpty(tagObj)) {
      tagId = Tags.insert({name: tag, company: company})
    }
    else {
      tagId = tagObj._id
    }
    return Candidates.update(candidateId, {$push: { tags: tagId }})
  },
  removeTagFromCandidate(tag, candidateId, company) {
    check([tag, candidateId, company],  [String]);

    let tagId = Tags.find({name: tag, company: company})
    return Candidates.update(candidateId, {$pull: { tags: tagId }})
  },
  reviewCandidate(candidateId, userId, message) {
    check([userId, candidateId, message],  [String]);

    let review = {
      "user": userId,
      "message": message
    }

    return Candidates.update(candidateId, {$push: { reviews: review }})
  },
  contactCandidate(candidateId, userId, messageText) {
    check([candidateId, userId, messageText],  [String]);
    let message = {
      "user": userId,
      "message": messageText
    }

    let candidate = Candidates.findOne(candidateId)
    let convId
    if (_.isEmpty(candidate.conversation.convId)) {
      convId = "<"+ userId+candidateId +"@upupup-app.fr>"
      let conv = {convId: convId , messages: []}
      Candidates.update(candidateId, {$set: { conversation: conv}})
    }
    else {
      convId = candidate.conversation.convId
    }
    Candidates.update(candidateId, {$push: { "conversation.messages": message }}, {multi: false, upserted: false}, function (error, rows) {
      if (!error) {
        Email.send({
          to: candidate.email,
          from: "reponse-candidature@upupup-app.fr",
          subject: "Votre candidature",
          html: messageText,
          headers: {"Message-Id": convId}
        })
      }
    })
  },
  candidateResponse(inReplyTo, candidateEmail, content, timestamp) {
    check([inReplyTo, candidateEmail, content],  [String]);
    check(timestamp, Number);

    let messageContent = content.replace(/^.*reponse-candidature@upupup-app.fr.*$/mg, "").replace(/^.*>.*$/mg, "").replace(/\+/g, " ").trim().replace(/\n/g, "<br />")
    let message = {
      "email": candidateEmail,
      "message": messageContent,
      "created_at": timestamp
    }

    let candidate = Candidates.findOne({"conversation.convId": inReplyTo})
    if (!candidate) {
      candidate = Candidates.find({"email": candidateEmail})
    }
    if (_.isArray(candidate)) {
      Email.send({
        to: "contact@upupup-app.com",
        from: "candidatures@upupup-app.fr",
        subject: "Candidature de " + candidateEmail,
        html: messageContent
      })
    }
    else {
      Candidates.update(candidate._id, {$push: {"conversation.messages": message}})
    }
  },
  addDocFromReply(email, file, inReplyTo) {
    check([email, file], [String])
    check(inReplyTo, Match.Optional( String ))

    let candidate = Candidates.findOne({"conversation.convId": inReplyTo})
    if (!candidate) {
      candidate = Candidates.find({"email": email})
    }
    if (_.isArray(candidate)) {
      Email.send({
        to: "contact@upupup-app.com",
        from: "candidatures@upupup-app.fr",
        subject: "Piece jointe de " + candidateEmail,
        html: file
      })
    }
    else {
      Candidates.update(candidate._id, {$addToSet: {"documents": file}})
    }
  },
  changePicture(candidateId, picture) {
    check([candidateId, picture], [String])
    return Candidates.update(candidateId, {$set: {"picture": picture}})
  },
  addDocs(candidateId, file) {
    check([candidateId, file], [String])
    return Candidates.update(candidateId, {$addToSet: {"documents": file}})
  },
  addEducation(candidateId, education) {
    check([candidateId, education], [String])
    return Candidates.update(candidateId, {$addToSet: {"education": education}})
  },
  addJob(candidateId, job) {
    check([candidateId, job], [String])
    return Candidates.update(candidateId, {$addToSet: {"jobs": job}})
  }
})
