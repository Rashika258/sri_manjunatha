"use client";
import React, { forwardRef } from "react";

const InvoiceHeaderBuyerAndSeller = () => {
  return (
    <div className="border-b p-4">
      <p className="text-sm font-sans">
        <span className="font-bold">Exporter: </span>
        Mahalaxmi Steel Suppliers
        <br />
        #S-5, Sunder Industrial Estate New TimberYard Layout, Mysore Road
        Bangalore-560026
        <br />
        <span className="font-bold">GSTIN/UIN: </span>29BDJPM3718A1ZO
        <br />
        <span className="font-bold">State Name: </span>Karnataka
        <br />
        <span className="font-bold">Code: </span>29
        <br />
        <span className="font-bold">Contact: </span>
        08026756931--29746932,+91-9844036779--9738273072
        <br />
        <span className="font-bold">E-Mail: </span>
        mahalaxmisteelsuppliers@gmail.com
      </p>
    </div>
  );
};

const InvoiceFooterSubDetails = ({
  title,
  value,
}: {
  title: string;
  value: string;
}) => {
  return (
    <div className="border flex items-center justify-between p-2">
      <p className="text-sm font-bold">{title}</p>
      <p className="text-sm">{value}</p>
    </div>
  );
};

const InvoiceHeaderSubDetails = ({
  title,
  value,
}: {
  title: string;
  value: string;
}) => {
  return (
    <div className="flex flex-col p-4 border-b">
      <p className="text-sm">{title}</p>
      <p className="font-bold">{value}</p>
    </div>
  );
};

const Invoice = forwardRef<HTMLDivElement>((_props, ref) => {
  const itemData = [
    {
      siNo: 1,
      description: "Product A",
      hsnSac: "1234",
      quantity: 2,
      rate: 100,
      amount: 200,
    },
    {
      siNo: 2,
      description: "Product B",
      hsnSac: "5678",
      quantity: 1,
      rate: 150,
      amount: 150,
    },
  ];

  return (
    <div
      ref={ref}
      id="invoice"
      style={{
        width: "210mm",
        height: "297mm",
        backgroundColor: "white",
        color: "black",
      }}
      className="flex  flex-col border "
    >
      <div className="grid grid-cols-2 border-b">
        <div className="border-r">
          <InvoiceHeaderBuyerAndSeller />
          <InvoiceHeaderBuyerAndSeller />
          <InvoiceHeaderBuyerAndSeller />
        </div>

        <div>
          <div className="grid grid-cols-2">
            <div className="border-r">
              <InvoiceHeaderSubDetails title="Invoice Number" value="1234" />
              <InvoiceHeaderSubDetails
                title="Eway Bill Number"
                value="213849899"
              />
              <InvoiceHeaderSubDetails
                title="Reference Number & Date"
                value="213849899"
              />
              <InvoiceHeaderSubDetails
                title="Buyer Order Number"
                value="213849899"
              />
              <InvoiceHeaderSubDetails
                title="Dispatch Doc Number"
                value="213849899"
              />
              <InvoiceHeaderSubDetails
                title="Dispatched Through"
                value="213849899"
              />
            </div>
            <div>
              <InvoiceHeaderSubDetails title="Invoice Number" value="1234" />
              <InvoiceHeaderSubDetails
                title="Eway Bill Number"
                value="213849899"
              />
              <InvoiceHeaderSubDetails
                title="Reference Number & Date"
                value="213849899"
              />
              <InvoiceHeaderSubDetails
                title="Buyer Order Number"
                value="213849899"
              />
              <InvoiceHeaderSubDetails
                title="Dispatch Doc Number"
                value="213849899"
              />
              <InvoiceHeaderSubDetails
                title="Dispatched Through"
                value="213849899"
              />
            </div>
          </div>
          <div className="p-4">
            <p>
              <span className="font-bold">Terms of Delivery: </span>
              Immediate delivery.
            </p>
          </div>
        </div>
      </div>

      <div className="p-4">
        <table className="table-auto w-full border-collapse border">
          <thead>
            <tr>
              <th className="border p-2 text-left">SI No</th>
              <th className="border p-2 text-left">Description of Goods</th>
              <th className="border p-2 text-left">HSN/SAC</th>
              <th className="border p-2 text-left">Quantity</th>
              <th className="border p-2 text-left">Rate</th>
              <th className="border p-2 text-left">Amount</th>
            </tr>
          </thead>
          <tbody>
            {itemData.map((item) => (
              <tr key={item.siNo}>
                <td className="border p-2">{item.siNo}</td>
                <td className="border p-2">{item.description}</td>
                <td className="border p-2">{item.hsnSac}</td>
                <td className="border p-2">{item.quantity}</td>
                <td className="border p-2">{item.rate}</td>
                <td className="border p-2">{item.amount}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="border p-16"></div>

      <div className="border p-4 ">
        <div className=" grid grid-cols-2">
          <div>
            <div className="border p-2">
              <p className="text-sm font-bold">Total Amount in Words:</p>
            </div>
            <div className="border p-2">
              <p className="text-sm ">hundred and ten</p>
            </div>
            <div className="border p-2">
              <p className="text-sm  font-bold">Bank Details</p>
            </div>
            <div className="border grid p-2 grid-cols-2">
              <div className="flex flex-col">
                <div>
                  <p className="text-sm font-bold">Bank Name:</p>
                </div>

                <div>
                  <p className="text-sm font-bold">Branch Name:</p>
                </div>

                <div>
                  <p className="text-sm font-bold">Bank Account Number:</p>
                </div>
                <div>
                  <p className="text-sm font-bold">Bank Branch IFSC:</p>
                </div>
              </div>
              <div className="flex flex-col">
                <div>
                  <p className="text-sm font-bold">SBI</p>
                </div>

                <div>
                  <p className="text-sm font-bold">tjhu</p>
                </div>

                <div>
                  <p className="text-sm font-bold">906890487905</p>
                </div>
                <div>
                  <p className="text-sm font-bold">60700680</p>
                </div>
              </div>
            </div>
            <div className="border p-2">
              <p className="text-sm font-bold">Terms and Conditions</p>
            </div>
            <div className="border p-2">
              <p className="text-sm ">
                <ol>
                  <li>
                    We are not responsible for Breakage,Damage, Fines by any
                  </li>
                  <li>
                    Interest will be charged at the rate of 24% per annum
                    towards unpaid Invoice from the Date of Invoice.
                  </li>
                  <li>Goods once sold cannot be taken back or exchanged.</li>
                  <li>Our weightment is final.</li>
                  <li>Payment by A/c payee Cheque/RTGS/LC only</li>
                </ol>
              </p>
            </div>
          </div>
          <div>
            <InvoiceFooterSubDetails title="Taxable Amount" value="1234" />
            <InvoiceFooterSubDetails title="CGST" value="10" />
            <InvoiceFooterSubDetails title="SGST" value="9" />
            <InvoiceFooterSubDetails title="Total amount After Tax" value="9" />
            <InvoiceFooterSubDetails
              title="GST Payable on Reverse Charge"
              value="9"
            />

            <div className="border p-2">
              <p className="text-sm font-bold">
                Certified that the above mentioned details are true and correct
              </p>
              Sri Manjunatha Engineering Works
            </div>

            <div className="border p-2">
              <p>This is computer generated invoice no signature required</p>
            </div>

            <div className="border p-2">
              <p className="font-bold">Authorized Signatory</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
});

Invoice.displayName = "Invoice";

export default Invoice;
