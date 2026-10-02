import React from "react";

import AdminCrudPage
  from "./AdminCrudPage";

import useSchoolData
  from "../../../hooks/useSchoolData";

import "./StudentsAdmin.css";

import {
  STUDENTS_KEY,
  getStudents,
  addStudent,
  updateStudent,
  deleteStudent,
} from "../../../data/studentsData";


const StudentsAdmin = () => {

  const [students] =
    useSchoolData(
      STUDENTS_KEY,
      getStudents
    );


  const fields = [
    {
      name: "name",
      label: "Student Name",
      required: true,
    },

    {
      name: "admissionNo",
      label: "Admission No.",
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
      name: "rollNo",
      label: "Roll No.",
    },

    {
      name: "gender",
      label: "Gender",
      type: "select",
      options: [
        "Male",
        "Female",
        "Other",
      ],
    },

    {
      name: "dob",
      label: "Date of Birth",
      type: "date",
    },

    {
      name: "parentId",
      label: "Parent ID",
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
    <div className="students-admin-page">

      <AdminCrudPage
        title="Students"
        label="SCHOOL MANAGEMENT"
        description="Add, update and manage all school students."
        data={students}

        fields={fields}

        searchFields={[
          "name",
          "admissionNo",
          "className",
          "section",
        ]}

        onAdd={addStudent}
        onUpdate={updateStudent}
        onDelete={deleteStudent}
      />

    </div>
  );
};

export default StudentsAdmin;