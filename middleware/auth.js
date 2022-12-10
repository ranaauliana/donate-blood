module.exports = {
  auth: (req, res, next) => {
    const session = req.session.user;
    if (session === null || session === undefined) {
      res.redirect("/account/login");
    } else {
      next();
    }
  },
};
