import { Schema, model } from "mongoose";

const ticketSchema = new Schema(
  {
    title: { type: String, required: true, unique: true },
    description: { type: String, required: true },
    status: { type: String, required: true },
    priority: { type: String, required: true },
  },
  {
    timestaps: true,
    versionKey: false,
  }
);

const tickeModel = model("ticket", ticketSchema);

export default tickeModel;
