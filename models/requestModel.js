const mongoose = require("mongoose");

const requestSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    hospital: {
      type: String,
      required: true,
    },
    address: {
      type: String,
      required: true,
    },
    location: {
      type: String,
      reqiured: true,
    },
    bloodType: {
      type: String,
      required: [true, "harus diisi"],
    },
    bloodRhesus: {
      type: String,
      required: true,
    },
    quantity: {
      type: String,
      required: true,
    },
    bloodOrder: {
      type: String,
      required: true,
    },
    rltives: {
      type: String,
      required: true,
    },
    number: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      enum: ["URGENT", "WHITE", "GREEN"],
      default: "URGENT",
    },
    userID: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "users",
      require: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Request", requestSchema);
