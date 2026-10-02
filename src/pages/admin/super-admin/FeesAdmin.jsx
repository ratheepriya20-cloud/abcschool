import React from "react";

import AdminCrudPage
  from "./AdminCrudPage";

import useSchoolData
  from "../../../hooks/useSchoolData";

import {
  FEES_KEY,
  getFees,
  addFee,
  updateFee,
  deleteFee,
} from "../../../data/feesData";

const FeesAdmin = () => {

  const [fees] =
    useSchoolData(
      FEES_KEY,
      getFees
    );

 // FeesAdmin
return (
  <div className="fees-admin-page">
    <AdminCrudPage
      title="Fees"
      label="FINANCE"
      description="Manage student fee records and payment status."
      data={fees}
      searchFields={[
        "studentId",
        "feeType",
        "status",
      ]}
      fields={[
        {
          name: "studentId",
          label: "Student ID",
          required: true,
        },
        {
          name: "feeType",
          label: "Fee Type",
          required: true,
        },
        {
          name: "amount",
          label: "Amount",
          type: "number",
          required: true,
        },
        {
          name: "dueDate",
          label: "Due Date",
          type: "date",
        },
        {
          name: "status",
          label: "Status",
          type: "select",
          options: [
            "Paid",
            "Pending",
            "Overdue",
          ],
          defaultValue: "Pending",
        },
        {
          name: "paymentDate",
          label: "Payment Date",
          type: "date",
        },
      ]}
      onAdd={addFee}
      onUpdate={updateFee}
      onDelete={deleteFee}
    />
  </div>
);
};

export default FeesAdmin;