import React from "react";
import "./StudentResults.css";

const StudentResults = ({
  results = [],
}) => {
  return (
    <div className="stuPage">
      <section className="stuHero small">
        <span>ACADEMIC RECORD</span>
        <h1>My Results</h1>
        <p>
          Results published by the school.
        </p>
      </section>

      <div className="stuTableBox">
        {results.length === 0 ? (
          <div className="stuEmpty">
            No result available.
          </div>
        ) : (
          <div className="stuTableScroll">
            <table className="stuTable">
              <thead>
                <tr>
                  <th>Exam</th>
                  <th>Subject</th>
                  <th>Marks</th>
                  <th>Total</th>
                  <th>Grade</th>
                </tr>
              </thead>

              <tbody>
                {results.map(
                  (item, index) => (
                    <tr
                      key={
                        item.id || index
                      }
                    >
                      <td>
                        {item.exam || "-"}
                      </td>

                      <td>
                        {item.subject ||
                          "-"}
                      </td>

                      <td>
                        {item.marks ??
                          "-"}
                      </td>

                      <td>
                        {item.totalMarks ??
                          100}
                      </td>

                      <td>
                        <strong>
                          {item.grade ||
                            "-"}
                        </strong>
                      </td>
                    </tr>
                  )
                )}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default StudentResults;