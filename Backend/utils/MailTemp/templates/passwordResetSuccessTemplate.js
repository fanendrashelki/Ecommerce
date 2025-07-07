const passwordResetSuccessTemplate = ({ name }) => `
<!DOCTYPE html>
<html>
<body style="font-family: Arial;">
  <h2>✅ Password Reset Successful</h2>
  <p>Hi ${name},</p>
  <p>Your password was successfully updated. If this wasn’t you, contact support immediately.</p>
</body>
</html>
`;

export default passwordResetSuccessTemplate;
