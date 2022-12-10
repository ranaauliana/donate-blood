const Request = require("../models/requestModel");

module.exports = {
  index: async (req, res) => {
    try {
      // urgent filter demand
      let request = await Request.find({ status: "URGENT" })
        .sort({
          $natural: -1,
        })
        .limit(5);

      // history
      let requestHistory = await Request.aggregate([
        {
          $match: {
            status: {
              $in: ["GREEN", "WHITE"],
            },
          },
        },
        {
          $limit: 5,
        },
      ]);
      // search

      let date;

      // list zero post
      if (request.length != 0) {
        date = request[0].createdAt;
      } else if (requestHistory.length != 0) {
        date = requestHistory[0].createdAt;
      }

      res.render("index", {
        request,
        requestHistory,
        date,
        session: req.session.user,
      });
    } catch (error) {
      console.log(error);
    }
  },
};
