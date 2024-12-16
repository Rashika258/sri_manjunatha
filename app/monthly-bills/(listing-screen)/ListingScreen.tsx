"use client";
import AppFilter from "@/components/common/app-filter";
import AppTable from "@/components/common/app-table";
import { addDays } from "date-fns";
import React, { useState } from "react";
import { DateRange } from "react-day-picker";



const mockData = [
  {
    id: 1,
    bill_no: "BILL001",
    company_name: "Company A",
    date: "2024-12-01",
    items: "Item A, Item B",
    price: 100,
    qty: 2,
    total: 200,
    payment_status: "Paid",
    tax: 18,
    e_way_bill_no: "EWB123",
    gst_no: "1234567890A",
    hsn_code: "HSN1234",
  },
  {
    id: 2,
    bill_no: "BILL002",
    company_name: "Company B",
    date: "2024-12-05",
    items: "Item C, Item D",
    price: 150,
    qty: 1,
    total: 150,
    payment_status: "Unpaid",
    tax: 27,
    e_way_bill_no: "EWB124",
    gst_no: "0987654321B",
    hsn_code: "HSN1235",
  },
  {
    id: 3,
    bill_no: "BILL003",
    company_name: "Company C",
    date: "2024-12-10",
    items: "Item E, Item F",
    price: 200,
    qty: 3,
    total: 600,
    payment_status: "Paid",
    tax: 36,
    e_way_bill_no: "EWB125",
    gst_no: "1122334455C",
    hsn_code: "HSN1236",
  },
  {
    id: 4,
    bill_no: "BILL004",
    company_name: "Company D",
    date: "2024-12-15",
    items: "Item G, Item H",
    price: 120,
    qty: 4,
    total: 480,
    payment_status: "Pending",
    tax: 21,
    e_way_bill_no: "EWB126",
    gst_no: "5566778899D",
    hsn_code: "HSN1237",
  },
  {
    id: 5,
    bill_no: "BILL005",
    company_name: "Company E",
    date: "2024-12-20",
    items: "Item I, Item J",
    price: 180,
    qty: 2,
    total: 360,
    payment_status: "Paid",
    tax: 32.4,
    e_way_bill_no: "EWB127",
    gst_no: "6677889900E",
    hsn_code: "HSN1238",
  },
  {
    id: 6,
    bill_no: "BILL006",
    company_name: "Company F",
    date: "2024-12-25",
    items: "Item K, Item L",
    price: 250,
    qty: 5,
    total: 1250,
    payment_status: "Unpaid",
    tax: 45,
    e_way_bill_no: "EWB128",
    gst_no: "7788990011F",
    hsn_code: "HSN1239",
  },
  {
    id: 7,
    bill_no: "BILL007",
    company_name: "Company G",
    date: "2024-12-30",
    items: "Item M, Item N",
    price: 200,
    qty: 6,
    total: 1200,
    payment_status: "Paid",
    tax: 36,
    e_way_bill_no: "EWB129",
    gst_no: "8899001122G",
    hsn_code: "HSN1240",
  },
  // More data can be generated as needed for testing
];


const ListingScreen = () => {
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [date, setDate] = React.useState<DateRange | undefined>({
    from: new Date(2022, 0, 20),
    to: addDays(new Date(2022, 0, 20), 20),
  })

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  return (
    <div className="flex flex-col w-full h-full ">
      <AppFilter searchQuery={searchQuery} handleSearch={handleSearch} date={date} setDate={setDate} />
      <AppTable data={mockData} />
    </div>
  );
};

export default ListingScreen;
