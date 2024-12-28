export const downloadInvoice = (billId: string) => {

      // Create the content for the invoice PDF (this could be customized)
    //   const invoiceContent = () => (
    //     `<div style={{ padding: "20px", fontFamily: "Arial, sans-serif" }}>
    //     <div ref={invoiceRef} style={{ padding: "20px", border: "1px solid #000", width: "800px", margin: "0 auto" }}>
    //       {/* Header */}
    //       <h2 style={{ textAlign: "center", marginBottom: "20px" }}>Tax Invoice</h2>
  
    //       {/* Seller and Buyer Details */}
    //       <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "20px" }}>
    //         <div style={{ flex: "0 0 48%" }}>
    //           <h4>Seller (From):</h4>
    //           <p>Mahalaxmi Steel Suppliers</p>
    //           <p>#S-5, Sunder Industrial Estate</p>
    //           <p>Mysore Road, Bangalore-560026</p>
    //           <p>GSTIN/UIN: 29BDJPM3718A1ZO</p>
    //         </div>
    //         <div style={{ flex: "0 0 48%" }}>
    //           <h4>Buyer (To):</h4>
    //           <p>SRI MANJUNATHA ENGINEERING WORKS</p>
    //           <p>#11/1, 1ST Cross, 2nd Main Road</p>
    //           <p>Ramachandra Puram, Bangalore-560021</p>
    //           <p>GSTIN/UIN: 29AEZPC6364C1Z5</p>
    //         </div>
    //       </div>
  
    //       {/* Invoice Details */}
    //       <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "20px" }}>
    //         <div>
    //           <p><strong>Invoice No:</strong> 394/2024-25</p>
    //           <p><strong>Date:</strong> 4-Nov-24</p>
    //         </div>
    //         <div>
    //           <p><strong>Dispatch Details:</strong> KA05AG5289</p>
    //           <p><strong>Mode/Terms of Payment:</strong> 15 Days</p>
    //         </div>
    //       </div>
  
    //       {/* Item Table */}
    //       <table style={{ width: "100%", borderCollapse: "collapse", marginBottom: "20px" }}>
    //         <thead>
    //           <tr>
    //             <th style={{ border: "1px solid #000", padding: "8px" }}>Sl No.</th>
    //             <th style={{ border: "1px solid #000", padding: "8px" }}>Description</th>
    //             <th style={{ border: "1px solid #000", padding: "8px" }}>HSN/SAC</th>
    //             <th style={{ border: "1px solid #000", padding: "8px" }}>Quantity</th>
    //             <th style={{ border: "1px solid #000", padding: "8px" }}>Rate</th>
    //             <th style={{ border: "1px solid #000", padding: "8px" }}>Amount</th>
    //           </tr>
    //         </thead>
    //         <tbody>
    //           <tr>
    //             <td style={{ border: "1px solid #000", padding: "8px" }}>1</td>
    //             <td style={{ border: "1px solid #000", padding: "8px" }}>H.R. Sheets 4.75mm to 10 mm</td>
    //             <td style={{ border: "1px solid #000", padding: "8px" }}>720852</td>
    //             <td style={{ border: "1px solid #000", padding: "8px" }}>1.98 MT</td>
    //             <td style={{ border: "1px solid #000", padding: "8px" }}>53,500</td>
    //             <td style={{ border: "1px solid #000", padding: "8px" }}>1,05,930</td>
    //           </tr>
    //           <tr>
    //             <td style={{ border: "1px solid #000", padding: "8px" }}>2</td>
    //             <td style={{ border: "1px solid #000", padding: "8px" }}>Loading and Cartages</td>
    //             <td style={{ border: "1px solid #000", padding: "8px" }}>996799</td>
    //             <td style={{ border: "1px solid #000", padding: "8px" }}>1</td>
    //             <td style={{ border: "1px solid #000", padding: "8px" }}>600</td>
    //             <td style={{ border: "1px solid #000", padding: "8px" }}>600</td>
    //           </tr>
    //         </tbody>
    //       </table>
  
    //       {/* Total Section */}
    //       <p><strong>Total: ₹1,26,390.00</strong></p>
  
    //       {/* Footer */}
    //       <p style={{ marginTop: "20px" }}>Declaration:</p>
    //       <p>1) Goods once sold cannot be returned.</p>
    //       <p>2) We are not responsible for damage during transit.</p>
    //     </div>
    //     </div>`
  
  
    //   );

    //   // Set options for html2pdf.js
    //   const options = {
    //     margin: 10,
    //     filename: `Invoice_${bill.bill_no}.pdf`,
    //     image: { type: "jpeg", quality: 0.98 },
    //     html2canvas: { scale: 2 },
    //     jsPDF: { unit: "mm", format: "a4", orientation: "portrait" },
    //   };

    //   // Generate PDF
    //   html2pdf().set(options).from(invoiceContent).save();
    // } else {
    //   console.log("Bill not found");
    // }
  };