import verifyEmail from "./templates/verifyEmail.js";
import welcomeTemplate from "../MailTemp/templates/welcomeTemplate.js";
import forgetPasswordTemplate from "../MailTemp/templates/forgetPasswordTemplate.js";
import passwordResetSuccessTemplate from "../MailTemp/templates/passwordResetSuccessTemplate.js";
import accountBlockedTemplate from "../MailTemp/templates/accountBlockedTemplate.js";

const MailTemp = ({ type, ...props }) => {
  const templates = {
    verifyEmail: verifyEmail,
    welcome: welcomeTemplate,
    forgetpassword: forgetPasswordTemplate,
    passwordResetSuccess: passwordResetSuccessTemplate,
    accountBlocked: accountBlockedTemplate,
  };

  const renderTemplate = templates[type];

  if (!renderTemplate) {
    return `<p>Invalid email type</p>`;
  }

  return renderTemplate(props);
};

export default MailTemp;
