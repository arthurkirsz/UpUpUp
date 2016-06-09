Meteor.startup( () => Modules.server.startup() );

// Handle Browser policy problems.
BrowserPolicy.content.allowFontDataUrl();
BrowserPolicy.content.allowInlineScripts();
BrowserPolicy.content.allowOriginForAll("fonts.gstatic.com");
BrowserPolicy.content.allowOriginForAll("fonts.googleapis.com");
BrowserPolicy.content.allowOriginForAll("twitter.github.io");
BrowserPolicy.content.allowOriginForAll("upupup.s3-eu-west-1.amazonaws.com")

Meteor.startup(function () {
  smtp = {
    username: 'username',
    password: 'pass',
    server: 'smtp.mandrillapp.com',
    port: 587
  };

  process.env.MAIL_URL = 'smtp://' + encodeURIComponent(smtp.username) + ':' + encodeURIComponent(smtp.password) + '@' + encodeURIComponent(smtp.server) + ':' + smtp.port;
});

Accounts.config({
  sendVerificationEmail: true
});

Accounts.onCreateUser(function (options, user) {
  user.company = options.company;
  user.firstname = options.firstname;
  user.lastname = options.lastname;

  return user;
});
