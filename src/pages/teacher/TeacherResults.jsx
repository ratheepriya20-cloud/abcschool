import React from "react";
import {
  FaChartBar,
} from "react-icons/fa";

import {
  PageHero,
  Empty,
} from "./TeacherReadComponents";

import "./TeacherResults.css";

const TeacherResults = ({
  results = [],
  students = [],
}) => {
  const studentName = (id) =>
    students.find(
      (s) =>
        String(s.id) ===
        String(id)
    )?.name || "Student";

  return (
    <div className="teacherRead-page">
      <PageHero
        eyebrow="READ ONLY"
        title="Student Results"
        description="View academic results for your assigned students."
        icon={FaChartBar}
      />

      {results.length ? (
        <div className="teacherRead-tableBox">
          <table className="teacherRead-table">
            <thead>
              <tr>
                <th>Student</th>
                <th>Exam</th>
                <th>Subject</th>
                <th>Marks</th>
                <th>Grade</th>
              </tr>
            </thead>

            <tbody>
              {results.map(
                (item) => (
                  <tr key={item.id}>
                    <td>
                      <strong>
                        {studentName(
                          item.studentId
                        )}
                      </strong>
                    </td>

                    <td>
                      {item.exam ||
                        "-"}
                    </td>

                    <td>
                      {item.subject ||
                        "-"}
                    </td>

                    <td>
                      {item.marks ??
                        "-"}
                      /
                      {item.totalMarks ??
                        100}
                    </td>

                    <td>
                      <span className="teacherRead-grade">
                        {item.grade ||
                          "-"}
                      </span>
                    </td>
                  </tr>
                )
              )}
            </tbody>
          </table>
        </div>
      ) : (
        <Empty text="No result records available." />
      )}
    </div>
  );
};

export default TeacherResults;