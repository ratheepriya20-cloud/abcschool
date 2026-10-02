import React from "react";

import AdminCrudPage
  from "./AdminCrudPage";

import useSchoolData
  from "../../../hooks/useSchoolData";

import "./AssignmentsAdmin.css";

import {
  ASSIGNMENTS_KEY,
  getAssignments,
  addAssignment,
  updateAssignment,
  deleteAssignment,
} from "../../../data/assignmentsData";


const AssignmentsAdmin = () => {

  const [assignments] =
    useSchoolData(
      ASSIGNMENTS_KEY,
      getAssignments
    );


  return (
    <div className="assignments-admin-page">

      <AdminCrudPage
        title="Assignments"
        label="ACADEMICS"
        description="Manage class assignments and due dates."

        data={assignments}

        searchFields={[
          "title",
          "subject",
          "className",
        ]}

        fields={[
          {
            name: "title",
            label: "Title",
            required: true,
          },

          {
            name: "subject",
            label: "Subject",
            required: true,
          },

          {
            name: "className",
            label: "Class",
            required: true,
          },

          {
            name: "section",
            label: "Section",
          },

          {
            name: "teacherId",
            label: "Teacher ID",
          },

          {
            name: "assignedDate",
            label: "Assigned Date",
            type: "date",
          },

          {
            name: "dueDate",
            label: "Due Date",
            type: "date",
          },

          {
            name: "description",
            label: "Description",
            type: "textarea",
            full: true,
            table: false,
          },
        ]}

        onAdd={addAssignment}
        onUpdate={updateAssignment}
        onDelete={deleteAssignment}
      />

    </div>
  );
};

export default AssignmentsAdmin;