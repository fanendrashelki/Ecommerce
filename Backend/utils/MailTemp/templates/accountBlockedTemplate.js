const accountBlockedTemplate = ({ name }) => `
<!DOCTYPE html>
<html>
<body style="font-family: Arial;">
  <h2>🚫 Account Blocked</h2>
  <p>Dear ${name},</p>
  <p>Your account has been blocked. If you think this is a mistake, contact our support team.</p>
</body>
</html>
`;

export default accountBlockedTemplate;
