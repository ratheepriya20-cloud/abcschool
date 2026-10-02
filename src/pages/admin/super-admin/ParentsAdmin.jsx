import React from "react";

import AdminCrudPage
  from "./AdminCrudPage";

import useSchoolData
  from "../../../hooks/useSchoolData";

import "./ParentsAdmin.css";

import {
  PARENTS_KEY,
  getParents,
  addParent,
  updateParent,
  deleteParent,
} from "../../../data/parentsData";


const ParentsAdmin = () => {

  const [parents] =
    useSchoolData(
      PARENTS_KEY,
      getParents
    );


  return (
    <div className="parents-admin-page">

      <AdminCrudPage
        title="Parents"
        label="SCHOOL MANAGEMENT"
        description="Manage parent and guardian records."
        data={parents}

        searchFields={[
          "name",
          "mobile",
          "email",
        ]}

        fields={[
          {
            name: "name",
            label: "Parent Name",
            required: true,
          },

          {
            name: "relationship",
            label: "Relationship",
            type: "select",
            options: [
              "Father",
              "Mother",
              "Guardian",
            ],
          },

          {
            name: "mobile",
            label: "Mobile",
            required: true,
          },

          {
            name: "email",
            label: "Email",
            type: "email",
          },

          {
            name: "studentId",
            label: "Student ID",
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
        ]}

        onAdd={addParent}
        onUpdate={updateParent}
        onDelete={deleteParent}
      />

    </div>
  );
};

export default ParentsAdmin;