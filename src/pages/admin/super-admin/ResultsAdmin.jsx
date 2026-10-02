import React from "react";

import AdminCrudPage
  from "./AdminCrudPage";
import "./ResultsAdmin.css";

import useSchoolData
  from "../../../hooks/useSchoolData";

import {
  RESULTS_KEY,
  getResults,
  addResult,
  updateResult,
  deleteResult,
} from "../../../data/resultsData";

const ResultsAdmin = () => {

  const [results] =
    useSchoolData(
      RESULTS_KEY,
      getResults
    );

  // ResultsAdmin
return (
  <div className="results-admin-page">
    <AdminCrudPage
      title="Results"
      label="ACADEMICS"
      description="Manage examination marks and student results."
      data={results}
      searchFields={[
        "studentId",
        "exam",
        "subject",
      ]}
      fields={[
        {
          name: "studentId",
          label: "Student ID",
          required: true,
        },
        {
          name: "exam",
          label: "Exam",
          required: true,
        },
        {
          name: "subject",
          label: "Subject",
          required: true,
        },
        {
          name: "marks",
          label: "Marks",
          type: "number",
          required: true,
        },
        {
          name: "totalMarks",
          label: "Total Marks",
          type: "number",
          defaultValue: "100",
        },
        {
          name: "grade",
          label: "Grade",
        },
        {
          name: "remarks",
          label: "Remarks",
        },
      ]}
      onAdd={addResult}
      onUpdate={updateResult}
      onDelete={deleteResult}
    />
  </div>
);
};

export default ResultsAdmin;