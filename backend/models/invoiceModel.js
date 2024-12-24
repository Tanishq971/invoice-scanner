const mongoose = require("mongoose");

const invoiceSchema = new mongoose.Schema({
  products: [
    {
      description: String,
      hsnCode: String,
      gstPercent: Number,
      taxableAmount: Number,
      sgst: Number,
      cgst: Number,
      amount: Number,
    },
  ],
  totalAmount: Number,
  uploadedAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Invoice", invoiceSchema);
