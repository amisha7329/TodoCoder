const { Schema, model } = require("mongoose");

const taskSchema = new Schema({
  userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
  name: { type: String, required: true },
  description: String,
  completed: { type: Boolean, default: false },
}, { timestamps: true });



const taskModel = model("Tasks", taskSchema);

module.exports = taskModel;
