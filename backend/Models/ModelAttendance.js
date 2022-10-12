const mongoose = require("mongoose");

const OrderRoomSchema = new mongoose.Schema(
  {
    room_id: {
      type: String,
      trim: true,
    },
    room_name: {
      type: String,
      trim: true,
    },
    room_price: {
      type: String,
      trim: true,
    },

    person_count: {
      type: String,
      trim: true,
    },
    no_of_room: {
      type: String,
      trim: true,
    },

    room_url: {
      type: String,
      trim: true,
    },
    
    total_price: {
      type: String,
      trim: true,
    },

    user_id: {
      type: String,
      trim: true,
    },
    user_name: {
      type: String,
      trim: true,
    },
    isApprove: {
      type: Number,
      default: 2,
    },
  },
  {
    timestamps: {
      type: Date,
      default: Date.now,
    },
  }
);

module.exports = mongoose.model("room_order_details", OrderRoomSchema);
