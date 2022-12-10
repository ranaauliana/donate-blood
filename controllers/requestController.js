const Request = require("../models/requestModel");

module.exports = {
  viewCreate: async (req, res) => {
    try {
      // flash
      const alertMessage = req.flash("alertMessage");
      const alertStatus = req.flash("alertStatus");
      const alert = { message: alertMessage, status: alertStatus };

      res.render("request/create", { session: req.session.user, alert });
    } catch (error) {
      req.flash("alertMessage", `${error.message}`);
      req.flash("alertStatus", "danger");
      res.redirect("/permohonan");
    }
  },
  actionCreate: async (req, res) => {
    try {
      const {
        name,
        hospital,
        address,
        location,
        bloodType,
        bloodRhesus,
        quantity,
        bloodOrder,
        rltives,
        number,
      } = req.body;

      let request = await Request({
        name,
        hospital,
        address,
        location,
        bloodType,
        bloodRhesus,
        quantity,
        bloodOrder,
        rltives,
        number,
        userID: req.session.user.id,
      });

      request.save();

      req.flash("alertMessage", "Berhasil tambah data pasien");
      req.flash("alertStatus", "success");
      res.redirect("/permohonan");
    } catch (error) {
      req.flash("alertMessage", `${error.message}`);
      req.flash("alertStatus", "danger");
      res.redirect("/permohonan");
    }
  },
  viewDetail: async (req, res) => {
    try {
      const { id } = req.params;

      let request = await Request.findOne({ _id: id });

      // fetch date
      let datetime = await Request.find();
      let date = datetime[0].createdAt;
      let update = datetime[0].updatedAt;

      res.render("request/detail", {
        request,
        date,
        update,
        session: req.session.user,
      });
    } catch (error) {
      console.log(error);
    }
  },
  viewAll: async (req, res) => {
    try {
      // pagination
      const page = req.query.p || 0;
      const perPage = 4;
      const request = await Request.find({
        status: "URGENT",
      })
        .sort({ $natural: -1 })
        .skip(page * perPage)
        .limit(perPage);

      let date = request[0].createdAt;

      // count paginate
      const count = await Request.find({ status: "URGENT" }).count();
      console.log(count);

      res.render("request/view_all", {
        request,
        date,
        session: req.session.user,
        totalpages: Math.ceil(count / perPage),
        currentPage: page,
      });
    } catch (error) {
      console.log(error);
    }
  },
  viewPost: async (req, res) => {
    try {
      // flash
      const alertMessage = req.flash("alertMessage");
      const alertStatus = req.flash("alertStatus");
      const alert = { message: alertMessage, status: alertStatus };

      // paginate
      const page = req.query.p || 0;
      const perPage = 3;

      const request = await Request.find({ userID: req.session.user.id })
        .sort({ $natural: -1 })
        .skip(page * perPage)
        .limit(perPage);

      // req datetime & zero post
      let date;
      let update;
      if (request.length != 0) {
        date = request[0].createdAt;
        update = request[0].updatedAt;
      }

      // count paginate
      const count = await Request.find({ userID: req.session.user.id }).count();

      res.render("request/post", {
        request,
        date,
        update,
        totalpages: Math.ceil(count / perPage),
        currentPage: page,
        alert,
        session: req.session.user,
      });
    } catch (error) {
      req.flash("alertMessage", `${error.message}`);
      req.flash("alertStatus", "danger");
      res.redirect("/permohonan/posting");
    }
  },
  viewEdit: async (req, res) => {
    try {
      // flash
      const alertMessage = req.flash("alertMessage");
      const alertStatus = req.flash("alertStatus");
      const alert = { message: alertMessage, status: alertStatus };

      const { id } = req.params;

      const request = await Request.findOne({ _id: id });

      res.render("request/edit", { session: req.session.user, alert, request });
    } catch (error) {
      console.log(error);
    }
  },
  actionEdit: async (req, res) => {
    try {
      const { id } = req.params;
      const {
        name,
        hospital,
        address,
        location,
        bloodType,
        bloodRhesus,
        quantity,
        bloodOrder,
        rltives,
        number,
      } = req.body;

      await Request.findOneAndUpdate(
        { _id: id },
        {
          name,
          hospital,
          address,
          location,
          bloodType,
          bloodRhesus,
          quantity,
          bloodOrder,
          rltives,
          number,
        }
      );
      req.flash("alertMessage", "Berhasil edit data pasien");
      req.flash("alertStatus", "success");
      res.redirect("/permohonan/posting");
    } catch (error) {
      req.flash("alertMessage", `${error.message}`);
      req.flash("alertStatus", "danger");
      res.redirect("/permohonan/postingan");
    }
  },
  statusGreen: async (req, res) => {
    try {
      const { id } = req.params;
      let request = await Request.findOne({ _id: id });

      let status = request.status === "URGENT" ? "GREEN" : " ";

      request = await Request.findOneAndUpdate({ _id: id }, { status });

      req.flash("alertMessage", "Berhasil update status");
      req.flash("alertStatus", "success");
      res.redirect("/permohonan/posting");
    } catch (error) {
      req.flash("alertMessage", `${error.message}`);
      req.flash("alertStatus", "danger");
      res.redirect("/permohonan/posting");
    }
  },
  statusWhite: async (req, res) => {
    try {
      const { id } = req.params;
      let request = await Request.findOne({ _id: id });

      let status = request.status === "URGENT" ? "WHITE" : " ";

      request = await Request.findOneAndUpdate({ _id: id }, { status });

      req.flash("alertMessage", "Berhasil update status");
      req.flash("alertStatus", "success");
      res.redirect("/permohonan/posting");
    } catch (error) {
      req.flash("alertMessage", `${error.message}`);
      req.flash("alertStatus", "danger");
      res.redirect("/permohonan/posting");
    }
  },
};
