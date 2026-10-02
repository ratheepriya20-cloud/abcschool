import React from "react";

import AdminCrudPage
  from "./AdminCrudPage";

import useSchoolData
  from "../../../hooks/useSchoolData";
import "./TeachersAdmin.css";
import {
  TEACHERS_KEY,
  getTeachers,
  addTeacher,
  updateTeacher,
  deleteTeacher,
} from "../../../data/teachersData";

const TeachersAdmin = () => {

  const [teachers] =
    useSchoolData(
      TEACHERS_KEY,
      getTeachers
    );
return (
  <div className="teachers-admin-page">

    <AdminCrudPage
      title="Teachers"
      label="SCHOOL MANAGEMENT"
      description="Manage faculty and teaching staff."
      data={teachers}

      searchFields={[
        "name",
        "employeeId",
        "department",
        "subject",
        "email",
      ]}

      fields={[
        {
          name: "name",
          label: "Teacher Name",
          required: true,
        },
        {
          name: "employeeId",
          label: "Employee ID",
          required: true,
        },
        {
          name: "designation",
          label: "Designation",
        },
        {
          name: "department",
          label: "Department",
        },
        {
          name: "subject",
          label: "Subject",
        },
        {
          name: "email",
          label: "School Email",
          type: "email",
        },
        {
          name: "schoolContact",
          label: "School Contact",
        },
        {
          name: "qualification",
          label: "Qualification",
        },
        {
          name: "experience",
          label: "Experience",
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

      onAdd={addTeacher}
      onUpdate={updateTeacher}
      onDelete={deleteTeacher}
    />

  </div>
);
}
export default TeachersAdmin;