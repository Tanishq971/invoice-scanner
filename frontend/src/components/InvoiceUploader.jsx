import React, { useState } from "react";
import axios from "axios";

export default function InvoiceUploader() {
  const [file, setFile] = useState(null);
  const [data, setData] = useState(null);

  const handleUpload = async () => {
    const formData = new FormData();
    formData.append("invoice", file);

    try {
      const response = await axios.post("http://localhost:5000/api/invoices/upload", formData);
      setData(response.data.data);
    } catch (error) {
      console.error("Error uploading invoice:", error);
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold">Upload Invoice</h1>
      <input
        type="file"
        onChange={(e) => setFile(e.target.files[0])}
        className="my-4 border p-2"
      />
      <button
        onClick={handleUpload}
        className="bg-blue-500 text-white px-4 py-2 rounded"
      >
        Upload
      </button>
      {data && (
        <div className="mt-6">
          <h2 className="font-bold text-xl">Extracted Invoice Data:</h2>
          <pre>{JSON.stringify(data, null, 2)}</pre>
        </div>
      )}
    </div>
  );
}
