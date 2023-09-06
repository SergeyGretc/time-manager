const { Schema, model } = require("mongoose");

const schema = new Schema(
  {
    // _id: {
    //   type: Schema.Types.ObjectId,
    //   required: true,
    // },
    projectName: {
      type: String,
      required: true,
    },
    level: {
      type: String,
      required: true,
    },
    priority: {
      type: String,
      required: true,
    },
    // gifts: {
    //   type: Array,
    //   required: true,
    // },
    // agreement: {
    //   type: Array,
    //   required: true,
    // },

    userId: { type: Schema.Types.ObjectId, ref: "Users", required: true },
    pageId: { type: Schema.Types.ObjectId, ref: "Users", required: true },
  },

  {
    timestamps: true,
  }
);

module.exports = model("Projects", schema);
