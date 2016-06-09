var knox = Meteor.npmRequire("knox");
var Fiber = Npm.require('fibers');

Picker.route('/webhooks/reponse-candidat', function(params, request, res, next) {
  if (request.method == "POST") {
    let whole = ""
    request.on("data", function(data) {
      whole += data;
    })
    request.on("end", function(data) {
      var body = unescape(whole);
      var firstEvent = _.first(JSON.parse(body.substring(16)))
      let firstMail = firstEvent.msg
      let timestamp = firstEvent.ts
      let inReplyTo = firstMail.headers["In-Reply-To"]
      let content = firstMail.text
      let candidate = firstMail.from_email
      let attachements = _.toArray(firstMail.attachments)

      var client = knox.createClient({
        key: Meteor.settings.aws.key,
        secret: Meteor.settings.aws.secret,
        bucket: Meteor.settings.aws.bucket,
        region: Meteor.settings.aws.region
      });

      _.forEach(attachements, function (at) {
        var buf = Buffer(at.content, 'base64');
        client.putBuffer(buf, "docs/" + at.name, {
          'x-amz-acl': 'public-read',
          'Content-Length': buf.length,
          ContentEncoding: 'base64',
        }, function (err, res) {
          if (err) {
            Email.send({
              to: "contact@upupup-app.com",
              from: "candidatures@upupup-app.fr",
              subject: "[Erreur] Piece jointe de " + candidate,
              html: err.message
            })
          }
          else {
            Fiber(function() {Meteor.call("addDocFromReply", candidate, res.req.url, inReplyTo)}).run();
          }
        });
      })
      Fiber(function() {
        Meteor.call('candidateResponse', inReplyTo, candidate, content, timestamp)
      }).run();
      res.end("thanks");
    })
  }
  else {
    res.end("thanks");
  }
});
