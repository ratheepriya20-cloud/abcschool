import React from "react";

import AdminCrudPage from "./AdminCrudPage";
import "./SubAdminsAdmin.css";

import useSchoolData from "../../../hooks/useSchoolData";

import {
  SUB_ADMINS_KEY,
  getSubAdmins,
  addSubAdmin,
  updateSubAdmin,
  deleteSubAdmin,
} from "../../../data/subAdminsData";


const SubAdminsAdmin = () => {

  const [subAdmins] = useSchoolData(
    SUB_ADMINS_KEY,
    getSubAdmins
  );


  const fields = [

    {
      name: "name",
      label: "Admin Name",
      required: true,
    },

    {
      name: "email",
      label: "Email Address",
      type: "email",
      required: true,
    },

    {
      name: "mobile",
      label: "Mobile Number",
      required: true,
    },

    {
      name: "designation",
      label: "Designation",
      required: true,
    },

    {
      name: "department",
      label: "Department",
      type: "select",
      options: [
        "Administration",
        "Academic",
        "Accounts",
        "Admission",
        "Communication",
      ],
    },

    {
      name: "status",
      label: "Status",
      type: "select",
      options: [
        "Active",
        "Inactive",
      ],
      defaultValue: "Active",
    },

  ];


  return (

    <div className="subadmins-admin-page">

      <AdminCrudPage
        title="Sub Admins"
        label="ADMINISTRATION"
        description="Create and manage school sub administrator accounts."

        data={subAdmins}

        fields={fields}

        searchFields={[
          "name",
          "email",
          "mobile",
          "designation",
          "department",
        ]}

        onAdd={addSubAdmin}
        onUpdate={updateSubAdmin}
        onDelete={deleteSubAdmin}
      />

    </div>

  );
};


export default SubAdminsAdmin;