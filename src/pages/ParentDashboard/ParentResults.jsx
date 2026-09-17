import React from "react";
import {
  FaChartBar,
  FaGraduationCap,
  FaTrophy,
  FaCheckCircle,
  FaStar,
} from "react-icons/fa";
import "./ParentResults.css";

const ParentResults = ({ results = [] }) => {
  const defaultResults = [
    {
      subject: "English",
      marks: 91,
      grade: "A+",
    },
    {
      subject: "Mathematics",
      marks: 94,
      grade: "A+",
    },
    {
      subject: "Science",
      marks: 89,
      grade: "A",
    },
    {
      subject: "Social Science",
      marks: 92,
      grade: "A+",
    },
    {
      subject: "Computer",
      marks: 96,
      grade: "A+",
    },
  ];

  const resultData =
    results.length > 0 ? results : defaultResults;

  const totalMarks = resultData.reduce(
    (total, item) => total + Number(item.marks),
    0
  );

  const average =
    resultData.length > 0
      ? (totalMarks / resultData.length).toFixed(1)
      : "0";

  const highestMarks =
    resultData.length > 0
      ? Math.max(...resultData.map((item) => Number(item.marks)))
      : 0;

  const getGradeClass = (grade) => {
    if (grade === "A+") return "abpr-grade-aplus";
    if (grade === "A") return "abpr-grade-a";
    if (grade === "B+") return "abpr-grade-bplus";
    if (grade === "B") return "abpr-grade-b";
    return "abpr-grade-default";
  };

  return (
    <div className="abpr-page">
      <div className="abpr-hero">
        <div className="abpr-hero-content">
          <div className="abpr-hero-icon">
            <FaChartBar />
          </div>

          <div>
            <span className="abpr-eyebrow">
              ACADEMIC PERFORMANCE
            </span>

            <h1>Academic Results</h1>

            <p>
              Track your child's academic progress and
              subject-wise performance.
            </p>
          </div>
        </div>

        <div className="abpr-session-badge">
          <FaGraduationCap />
          <span>Session 2026 - 27</span>
        </div>
      </div>

      <div className="abpr-summary-grid">
        <div className="abpr-summary-card">
          <div className="abpr-summary-icon abpr-blue-icon">
            <FaChartBar />
          </div>

          <div>
            <span>Average Score</span>
            <strong>{average}%</strong>
          </div>
        </div>

        <div className="abpr-summary-card">
          <div className="abpr-summary-icon abpr-gold-icon">
            <FaTrophy />
          </div>

          <div>
            <span>Highest Score</span>
            <strong>{highestMarks}%</strong>
          </div>
        </div>

        <div className="abpr-summary-card">
          <div className="abpr-summary-icon abpr-green-icon">
            <FaCheckCircle />
          </div>

          <div>
            <span>Subjects</span>
            <strong>{resultData.length}</strong>
          </div>
        </div>

        <div className="abpr-summary-card">
          <div className="abpr-summary-icon abpr-purple-icon">
            <FaStar />
          </div>

          <div>
            <span>Overall Grade</span>
            <strong>A+</strong>
          </div>
        </div>
      </div>

      <div className="abpr-main-grid">
        <section className="abpr-result-card">
          <div className="abpr-card-header">
            <div>
              <span className="abpr-small-title">
                TERM PERFORMANCE
              </span>
              <h2>Subject Wise Results</h2>
            </div>

            <div className="abpr-result-count">
              {resultData.length} Subjects
            </div>
          </div>

          <div className="abpr-subject-list">
            {resultData.map((item, index) => (
              <div
                className="abpr-subject-row"
                key={`${item.subject}-${index}`}
              >
                <div className="abpr-subject-number">
                  {String(index + 1).padStart(2, "0")}
                </div>

                <div className="abpr-subject-info">
                  <div className="abpr-subject-top">
                    <strong>{item.subject}</strong>

                    <span
                      className={`abpr-grade ${getGradeClass(
                        item.grade
                      )}`}
                    >
                      {item.grade}
                    </span>
                  </div>

                  <div className="abpr-progress-area">
                    <div className="abpr-progress-track">
                      <div
                        className="abpr-progress-fill"
                        style={{
                          width: `${item.marks}%`,
                        }}
                      />
                    </div>

                    <strong>{item.marks}%</strong>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        <aside className="abpr-performance-card">
          <div className="abpr-performance-icon">
            <FaTrophy />
          </div>

          <span className="abpr-small-title">
            OVERALL PERFORMANCE
          </span>

          <h2>Excellent Work!</h2>

          <div className="abpr-circle">
            <div className="abpr-circle-inner">
              <strong>{average}%</strong>
              <span>Average</span>
            </div>
          </div>

          <p>
            Your child's academic performance is excellent.
            Keep encouraging consistent learning and
            participation.
          </p>

          <div className="abpr-performance-points">
            <div>
              <FaCheckCircle />
              <span>Strong academic performance</span>
            </div>

            <div>
              <FaCheckCircle />
              <span>Excellent subject scores</span>
            </div>

            <div>
              <FaCheckCircle />
              <span>Consistent progress</span>
            </div>
          </div>
        </aside>
      </div>

      <section className="abpr-detail-card">
        <div className="abpr-card-header">
          <div>
            <span className="abpr-small-title">
              RESULT DETAILS
            </span>

            <h2>Detailed Mark Sheet</h2>
          </div>
        </div>

        <div className="abpr-table-wrapper">
          <table className="abpr-table">
            <thead>
              <tr>
                <th>#</th>
                <th>Subject</th>
                <th>Marks</th>
                <th>Performance</th>
                <th>Grade</th>
              </tr>
            </thead>

            <tbody>
              {resultData.map((item, index) => (
                <tr
                  key={`table-${item.subject}-${index}`}
                >
                  <td>{index + 1}</td>

                  <td>
                    <strong>{item.subject}</strong>
                  </td>

                  <td>
                    <strong className="abpr-table-marks">
                      {item.marks}%
                    </strong>
                  </td>

                  <td>
                    <div className="abpr-table-progress">
                      <div className="abpr-progress-track">
                        <div
                          className="abpr-progress-fill"
                          style={{
                            width: `${item.marks}%`,
                          }}
                        />
                      </div>
                    </div>
                  </td>

                  <td>
                    <span
                      className={`abpr-grade ${getGradeClass(
                        item.grade
                      )}`}
                    >
                      {item.grade}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <div className="abpr-note">
        <div className="abpr-note-icon">
          <FaGraduationCap />
        </div>

        <div>
          <strong>Keep Going!</strong>

          <p>
            Regular practice, attendance and active
            participation can help maintain strong academic
            performance.
          </p>
        </div>
      </div>
    </div>
  );
};

export default ParentResults;