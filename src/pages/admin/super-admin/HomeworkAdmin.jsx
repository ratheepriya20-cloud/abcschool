import React from "react";

import AdminCrudPage from "./AdminCrudPage";
import "./HomeworkAdmin.css";

import useSchoolData from "../../../hooks/useSchoolData";

import {
  HOMEWORK_KEY,
  getHomework,
  addHomework,
  updateHomework,
  deleteHomework,
} from "../../../data/homeworkData";

const HomeworkAdmin = () => {
  const [homework] =
    useSchoolData(
      HOMEWORK_KEY,
      getHomework
    );

  const fields = [
    {
      name: "title",
      label: "Homework Title",
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
      required: true,
    },

    {
      name: "teacherId",
      label: "Teacher ID",
    },

    {
      name: "assignedDate",
      label: "Assigned Date",
      type: "date",
      required: true,
    },

    {
      name: "dueDate",
      label: "Due Date",
      type: "date",
      required: true,
    },

    {
      name: "status",
      label: "Status",
      type: "select",
      options: [
        "Active",
        "Completed",
        "Archived",
      ],
      defaultValue: "Active",
    },

    {
      name: "description",
      label: "Homework Details",
      type: "textarea",
      full: true,
      table: false,
      required: true,
    },
  ];

 // HomeworkAdmin
return (
  <div className="homework-admin-page">
    <AdminCrudPage
      title="Homework"
      label="ACADEMICS"
      description="Create, edit and manage homework assigned to classes."
      data={homework}
      fields={fields}
      searchFields={[
        "title",
        "subject",
        "className",
        "section",
        "teacherId",
      ]}
      onAdd={addHomework}
      onUpdate={updateHomework}
      onDelete={deleteHomework}
    />
  </div>
);
};

export default HomeworkAdmin;