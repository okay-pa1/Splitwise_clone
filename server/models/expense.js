const mongoose = require("mongoose");

const expenseSchema = new mongoose.Schema({
  //removed by pawan
  // group: {
  //   type: String,
  //   required: true,
  // },
  numberOfUsers: {
    type: Number,
    required: true,
  },
  userNames: {
    type: [String],
    required: true,
  },
  expenses: {
    type: [Number],
    default: function () {
      return new Array(this.numberOfUsers).fill(0);
    },
  },
});

const Expense = mongoose.model("Expense", expenseSchema);

module.exports = Expense;
