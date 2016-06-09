Accounts.emailTemplates.resetPassword.siteName = () => "UpUpUp";
Accounts.emailTemplates.resetPassword.from     = () => "Support UpUpUp <email>";
Accounts.emailTemplates.resetPassword.subject  = () => "[UpUpUp] Réinitialisez votre mot de passe";

Accounts.emailTemplates.resetPassword.text = ( user, url ) => {
  let emailAddress   = user.emails[0].address,
      urlWithoutHash = url.replace( '#/', '' ),
      supportEmail   = "email",
      emailBody      = `A password reset has been requested for the account related to this address (${emailAddress}). To reset the password, visit the following link:\n\n${urlWithoutHash}\n\n If you did not request this reset, please ignore this email. If you feel something is wrong, please contact our support team: ${supportEmail}.`;

  return emailBody;
};
