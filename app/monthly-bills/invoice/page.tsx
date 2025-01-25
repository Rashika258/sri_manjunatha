"use client";

import React, { useState, useEffect, useCallback } from "react";
import { useParams } from "next/navigation";
import { AppFormHeader, AppFormLoader, AppTableError } from "@/components/common/index";

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
      <AppFormHeader headerText="Invoice" />
      {loading ? (
        <AppFormLoader />
      ) : pdfUrl ? (
        <iframe
          src={pdfUrl}
          title="Invoice PDF"
          style={{ width: "100%", height: "600px", border: "none" }}
        ></iframe>
      ) : (
        <AppTableError errorText="Failed to load the invoice" />
      )}
    </div>
  );
};

export default InvoicePage;
