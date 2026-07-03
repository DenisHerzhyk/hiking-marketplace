export const profile = async (req, res) => {
  return res.status(201).json({ user: req.user, token: req.cookies.jwt });
};
