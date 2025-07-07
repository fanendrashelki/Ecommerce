const welcomeTemplate = ({ name }) => `
<!DOCTYPE html>
<html>
<body style="font-family: Arial;">
  <h2>👋 Welcome ${name}!</h2>
  <p>Thanks for joining Ecommerce App. Start shopping now and enjoy the benefits!</p>
  <a href="https://yourapp.com" style="background: #4CAF50; color: white; padding: 10px 20px; text-decoration: none; border-radius: 5px;">Go to App</a>
</body>
</html>
`;

export default welcomeTemplate;
