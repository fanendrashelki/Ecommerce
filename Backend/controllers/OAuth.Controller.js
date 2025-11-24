import jwt from 'jsonwebtoken'


export const Callback = async (req, res) => {
  try {
    const token = jwt.sign({ id: req.user._id, email: req.user.email }, process.env.JWT_SECRET, {
      expiresIn: "7d"
    })
    res.redirect(`${process.env.CLIENT_URL}auth-success?token=${token}`)
  } catch (error) {
    console.error("Google login error", error);
    res.redirect(`${process.env.CLIENT_URL}/login?error=google_failed`)
  }
}



export const Me = async (req, res) => {
  try {
    res.json({
      success: true,
      user: req.user
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Server error"
    });
  }
};

