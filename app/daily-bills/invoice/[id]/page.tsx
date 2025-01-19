"use client";

import React, { useState, useEffect, useCallback } from "react";
import { fetchBillDataAsInvoice } from "../../(utils)";
import { useParams } from "next/navigation";

const InvoicePage = () => {
  const { id } = useParams();
  const [pdfUrl, setPdfUrl] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  const loadInvoice = useCallback(async () => {
    try {
      const pdfBase64 = await fetchBillDataAsInvoice(id as string);
      setPdfUrl(pdfBase64);
    } catch (error) {
      console.error("Error loading invoice:", error);
    } finally {
      setLoading(false);
    }
  },[]);

  useEffect(() => {


    loadInvoice();
  }, []);

  console.log("pdfUrl", pdfUrl);
  

  return (
    <div className="p-4 w-full h-full">
      <h1>Invoice Page</h1>
      {loading ? (
        <p>Loading...</p>
      ) : pdfUrl ? (
        <iframe
          src={pdfUrl}
          title="Invoice PDF"
          style={{ width: "100%", height: "600px", border: "none" }}
        ></iframe>
      ) : (
        <p>Failed to load the invoice.</p>
      )}
    </div>
  );
};

export default InvoicePage;
