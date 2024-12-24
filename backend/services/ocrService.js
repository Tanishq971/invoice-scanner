const Tesseract = require("tesseract.js");

async function extractInvoiceData(filePath) {
  const { data } = await Tesseract.recognize(filePath, "eng");
  const extractedText = data.text;
 console.log('Extracted Text:', extractedText);
  // Parse text to structured data
  const parsedData = parseInvoiceText(extractedText);
  console.dir(parsedData);
  return parsedData;
}

function parseInvoiceText(text) {
    const products = [];
    let totalAmount = 0;
  
    // Regular expressions to extract product details (this is just a basic example)
    const productRegex = /(\w+[\w\s]+)\s*(\d{4,6})\s*(\d+(\.\d{1,2})?)\s*(\d+(\.\d{1,2})?)\s*(\d+(\.\d{1,2})?)/g;
  
    let match;
    while ((match = productRegex.exec(text)) !== null) {
      // Extracted data based on regex
      const description = match[1];
      const hsnCode = match[2];
      const gstPercent = parseFloat(match[3]);
      const taxableAmount = parseFloat(match[4]);
      const sgst = parseFloat(match[5]);
      const cgst = parseFloat(match[6]);
      const amount = parseFloat(match[7]);
  
      // Push the product data to the array
      products.push({
        description,
        hsnCode,
        gstPercent,
        taxableAmount,
        sgst,
        cgst,
        amount,
      });
  
      // Update totalAmount (you can modify this logic based on the invoice structure)
      totalAmount += amount;
    }
  
    return { products, totalAmount };
  }
  

module.exports = extractInvoiceData;
