"use client";

import React, { useState, useEffect, useCallback } from "react";
import { fetchBillData, generateInvoicePDF } from "../../(utils)";
import { useParams } from "next/navigation";
import { AppFormHeader, AppFormLoader, AppTableError } from "@/components/common/index";

const InvoicePage = () => {
  const { id } = useParams();
  const [pdfUrl, setPdfUrl] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  const loadInvoice = useCallback(async () => {
    try {
      const data = await fetchBillData(id as string);      
      const pdfBase64 = generateInvoicePDF(data);
      setPdfUrl(pdfBase64);
    } catch (error) {
      console.error("Error loading invoice:", error);
    } finally {
      setLoading(false);
    }
  },[id]);

  useEffect(() => {
    loadInvoice();
  }, []);


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
