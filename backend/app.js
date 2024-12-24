const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const connectDB = require("./database");
const invoiceRoutes = require("./routes/invoiceRoutes");
const parseInvoiceText = require("./services/ocrService");
const app = express();
connectDB();




app.use(bodyParser.json());
app.use(cors());
app.use("/api/invoices", invoiceRoutes);

app.listen(5000, () => {
  console.log("Server running on port 5000");
});


// const mockText = `cls
// Product 1    12345   10.00   50.00   2.00   2.00   54.00
// Product 2    67890   12.00   60.00   3.00   3.00   66.00
// `;

// const parsedData = parseInvoiceText(mockText);
// console.log(parsedData);