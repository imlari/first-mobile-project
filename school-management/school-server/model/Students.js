const mongoose = require("mongoose");
const Schema = mongoose.Schema;

let Students = new Schema(
  {
    name: {
      type: String,
    },
    cpf: {
      type: String,
    },
    matricula: {
      type: string,
    },
  },
  {
    collection: "students",
  }
);

module.exports = mongoose.model("Students", Students);
