Slingshot.fileRestrictions("picturesUploads", {
  allowedFileTypes: ["image/png", "image/jpeg", "image/gif"],
  maxSize: 10 * 1024 * 1024 // 10 MB (use null for unlimited).
});

Slingshot.fileRestrictions("docsUploads", {
  allowedFileTypes: null,
  maxSize: 50 * 1024 * 1024 // 50 MB (use null for unlimited).
});


if (Meteor.isServer) {
  Slingshot.createDirective("picturesUploads", Slingshot.S3Storage, {
    bucket: Meteor.settings.aws.bucket,
    acl: "public-read",
    authorize: function () {
      //Deny uploads if user is not logged in.
      //if (!this.userId) {
      //  var message = "Please login before posting files";
      //  throw new Meteor.Error("Login Required", message);
      //}

      return true;
    },
    AWSAccessKeyId: Meteor.settings.aws.key,
    AWSSecretAccessKey: Meteor.settings.aws.secret,
    region: Meteor.settings.aws.region,
    key: function (fileInfo, fileMeta) {
      return "pictures/" + fileInfo.name;
    }

  });
  Slingshot.createDirective("docsUploads", Slingshot.S3Storage, {
    bucket: Meteor.settings.aws.bucket,
    acl: "public-read",
    authorize: function () {
      //Deny uploads if user is not logged in.
      //if (!this.userId) {
      //  var message = "Please login before posting files";
      //  throw new Meteor.Error("Login Required", message);
      //}

      return true;
    },
    AWSAccessKeyId: Meteor.settings.aws.key,
    AWSSecretAccessKey:  Meteor.settings.aws.secret,
    region: Meteor.settings.aws.region,
    key: function (fileInfo, fileMeta) {
      return "docs/" + fileInfo.name;
    }

  });
}

Pools = {}
Pools.timeoutEmails = [] // [{id, timeout}]
Pools.timeoutNotifications = [] // [{id, timeout}]
