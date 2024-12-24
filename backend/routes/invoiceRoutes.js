const express = require("express");
const multer = require("multer");
const extractInvoiceData = require("../services/ocrService");
const Invoice = require("../models/invoiceModel");

const router = express.Router();
const upload = multer({ dest: "uploads/" });

router.post("/upload", upload.single("invoice"), async (req, res) => {
  try {
    const invoiceData = await extractInvoiceData(req.file.path);
    console.dir(req.file.path)
    
    console.dir(invoiceData);
    
    const savedInvoice = await Invoice.create(invoiceData);

    res.status(200).json({
      message: "Invoice processed successfully",
      data: savedInvoice,
    });
  } catch (error) {
    res.status(500).json({ message: "Error processing invoice", error });
  }
});

module.exports = router;
