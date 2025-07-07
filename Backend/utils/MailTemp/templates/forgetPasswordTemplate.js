const forgetPasswordTemplate = ({ name, otp, otpExpireTime }) => `
 <!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Reset Your Password</title>
</head>
<body style="background-color: #f4f4f4; padding: 0; margin: 0;">
  <table width="100%" cellpadding="0" cellspacing="0" style="font-family: Arial, sans-serif;">
    <tr>
      <td align="center">
        <table width="600" cellpadding="0" cellspacing="0" style="background-color: #ffffff; margin: 40px auto; padding: 30px; border-radius: 8px; box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);">
          <tr>
            <td style="text-align: center;">
              <h1 style="color: #333;">🔑 Reset Your Password</h1>
              <p style="font-size: 16px; color: #555;">Hi <strong>${name}</strong>,</p>
              <p style="font-size: 16px; color: #555;">
                 Use the OTP below to reset your password. This code will expire in <strong>${otpExpireTime} minutes</strong>.
              </p>
              <div style="margin: 30px auto; display: inline-block; font-size: 32px; font-weight: bold; color: #2c3e50; letter-spacing: 4px; padding: 12px 24px; border: 2px dashed #2c3e50; border-radius: 8px; background-color: #f9f9f9;">
                ${otp}
              </div>
              <p style="font-size: 14px; color: #999; margin-top: 30px;">
                If you did not request this OTP, please ignore this email or contact our support.
              </p>
              <p style="font-size: 14px; color: #999;">
                Thank you,<br />
                <strong>Myshop Team</strong>
              </p>
            </td>
          </tr>
        </table>
        <p style="font-size: 12px; color: #bbb; text-align: center;">&copy; ${new Date().getFullYear()} Myshop. All rights reserved.</p>
      </td>
    </tr>
  </table>
</body>
</html>
`;

export default forgetPasswordTemplate;
