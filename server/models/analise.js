const { Schema, model } = require("mongoose");

const schema = new Schema(
  {
    projectName: {
      type: String,
      required: true,
    },
    min: {
      type: Number,
      required: true,
    },
    sec: {
      type: Number,
      required: true,
    },
    userId: { type: Schema.Types.ObjectId, ref: "Users", required: true },
    pageId: { type: Schema.Types.ObjectId, ref: "Users", required: true },
  },

  {
    timestamps: true,
  }
);

module.exports = model("Analise", schema);
