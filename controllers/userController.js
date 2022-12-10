const User = require("../models/userModel");
const bcrypt = require("bcryptjs");

module.exports = {
  viewLogin: async (req, res) => {
    try {
      // flash
      const alertMessage = req.flash("alertMessage");
      const alertStatus = req.flash("alertStatus");
      const alert = { message: alertMessage, status: alertStatus };

      res.render("users/login", { alert });
    } catch (error) {
      req.flash("alertMessage", `${error.message}`);
      req.flash("alertStatus", "danger");
      res.redirect("/account/login");
    }
  },
  actionLogin: async (req, res) => {
    try {
      const { email, password } = req.body;
      const user = await User.findOne({ email });

      if (user) {
        const checkPassword = await bcrypt.compare(password, user.password);
        if (checkPassword) {
          req.session.user = {
            id: user._id,
            email: user.email,
            username: user.username,
          };
          res.redirect("/");
        } else {
          req.flash("alertMessage", "Password yang anda masukan salah");
          req.flash("alertStatus", "danger");
          res.redirect("/account/login");
        }
      } else {
        req.flash("alertMessage", "Email yang anda masukkan salah");
        req.flash("alertStatus", "danger");
        res.redirect("/account/login");
      }
    } catch (error) {
      req.flash("alertMessage", `${error.message}`);
      req.flash("alertStatus", "danger");
      res.redirect("/account/login");
    }
  },
  viewRegister: async (req, res) => {
    try {
      // flash
      const alertMessage = req.flash("alertMessage");
      const alertStatus = req.flash("alertStatus");
      const alert = { message: alertMessage, status: alertStatus };

      res.render("users/register", { alert });
    } catch (error) {
      console.log(error);
    }
  },
  actionRegister: async (req, res) => {
    try {
      const { username, email, password, passConfirm } = req.body;
      const acc = await User.findOne({ email: email });

      // check email
      if (!acc) {
        // check pw
        if (password === passConfirm) {
          let user = new User({
            username,
            email,
            password: bcrypt.hashSync(password, 10),
          });
          await user.save();
          req.flash("alertMessage", "Berhasil menambahkan akun");
          req.flash("alertStatus", "success");
          res.redirect("/account/register");
        } else {
          req.flash("alertMessage", "password tidak sama");
          req.flash("alertStatus", "danger");
          res.redirect("/account/register");
        }
      } else {
        req.flash("alertMessage", "Email sudah terdaftar");
        req.flash("alertStatus", "danger");
        res.redirect("/account/register");
      }
    } catch (error) {
      req.flash("alertMessage", `${error.message}`);
      req.flash("alertStatus", "danger");
      res.redirect("/account/register");
    }
  },
  actLogout: async (req, res) => {
    try {
      req.session.destroy();
      res.redirect("/");
    } catch (error) {
      console.log(error);
    }
  },
};
