import React, { useMemo, useState } from "react";
import {
  FaChartLine,
  FaGraduationCap,
  FaTrophy,
  FaDownload,
  FaSearch,
  FaArrowUp,
} from "react-icons/fa";
import "./Results.css";

const resultData = [
  {
    subject: "English",
    code: "ENG",
    marks: 84,
    total: 100,
    grade: "A",
    remark: "Excellent",
  },
  {
    subject: "Hindi",
    code: "HIN",
    marks: 89,
    total: 100,
    grade: "A+",
    remark: "Excellent",
  },
  {
    subject: "Mathematics",
    code: "MAT",
    marks: 91,
    total: 100,
    grade: "A+",
    remark: "Outstanding",
  },
  {
    subject: "Science",
    code: "SCI",
    marks: 87,
    total: 100,
    grade: "A",
    remark: "Excellent",
  },
  {
    subject: "Social Science",
    code: "SST",
    marks: 82,
    total: 100,
    grade: "A",
    remark: "Very Good",
  },
  {
    subject: "Computer",
    code: "COM",
    marks: 94,
    total: 100,
    grade: "A+",
    remark: "Outstanding",
  },
];

const examData = [
  "Half Yearly Examination",
  "Periodic Test - 1",
  "Periodic Test - 2",
  "Annual Examination",
];

const Results = () => {
  const [selectedExam, setSelectedExam] = useState(examData[0]);
  const [search, setSearch] = useState("");

  const filteredResults = useMemo(() => {
    return resultData.filter((item) =>
      `${item.subject} ${item.grade} ${item.remark}`
        .toLowerCase()
        .includes(search.toLowerCase())
    );
  }, [search]);

  const totalMarks = resultData.reduce(
    (sum, item) => sum + item.marks,
    0
  );

  const totalPossible = resultData.reduce(
    (sum, item) => sum + item.total,
    0
  );

  const percentage = Math.round(
    (totalMarks / totalPossible) * 100
  );

  return (
    <main className="schoolResultsPage">
      <section className="schoolResultsHero">
        <div className="schoolResultsGlow"></div>

        <div className="schoolResultsHeroInner">
          <div>
            <span className="schoolResultsBadge">
              <FaChartLine />
              ACADEMIC PERFORMANCE
            </span>

            <h1>
              Results &
              <span> Performance</span>
            </h1>

            <p>
              Track academic progress, subject-wise performance and
              examination results in one place.
            </p>
          </div>

          <div className="schoolResultsStudent">
            <div className="schoolResultsStudentIcon">
              <FaGraduationCap />
            </div>

            <div>
              <small>STUDENT</small>
              <strong>Rahul Sharma</strong>
              <span>Class X • Section A</span>
            </div>
          </div>
        </div>
      </section>

      <section className="schoolResultsContent">
        <div className="schoolResultsTop">
          <div>
            <span>REPORT CARD</span>
            <h2>Academic Results</h2>
          </div>

          <button className="schoolResultsDownload">
            <FaDownload />
            Download Report
          </button>
        </div>

        <div className="schoolResultsFilters">
          <div className="schoolResultsExamSelect">
            <label>Select Examination</label>

            <select
              value={selectedExam}
              onChange={(e) => setSelectedExam(e.target.value)}
            >
              {examData.map((exam) => (
                <option key={exam}>{exam}</option>
              ))}
            </select>
          </div>

          <div className="schoolResultsSearch">
            <FaSearch />

            <input
              type="text"
              placeholder="Search subject..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
        </div>

        <div className="schoolResultsSummary">
          <article>
            <div className="schoolResultsSummaryIcon">
              <FaTrophy />
            </div>

            <span>Overall Percentage</span>
            <strong>{percentage}%</strong>
            <small>Excellent performance</small>
          </article>

          <article>
            <div className="schoolResultsSummaryIcon blue">
              <FaChartLine />
            </div>

            <span>Total Marks</span>
            <strong>
              {totalMarks}/{totalPossible}
            </strong>
            <small>Current examination</small>
          </article>

          <article>
            <div className="schoolResultsSummaryIcon gold">
              <FaGraduationCap />
            </div>

            <span>Overall Grade</span>
            <strong>A+</strong>
            <small>Academic performance</small>
          </article>

          <article>
            <div className="schoolResultsSummaryIcon green">
              <FaArrowUp />
            </div>

            <span>Performance</span>
            <strong>+8%</strong>
            <small>Compared to previous</small>
          </article>
        </div>

        <div className="schoolResultsTableBox">
          <div className="schoolResultsTableHeader">
            <div>
              <span>SUBJECT PERFORMANCE</span>
              <h3>{selectedExam}</h3>
            </div>

            <div className="schoolResultsTableCount">
              {filteredResults.length} Subjects
            </div>
          </div>

          <div className="schoolResultsTable">
            <div className="schoolResultsTableHead">
              <span>Subject</span>
              <span>Marks</span>
              <span>Grade</span>
              <span>Remark</span>
            </div>

            {filteredResults.map((item) => (
              <div
                className="schoolResultsTableRow"
                key={item.code}
              >
                <div className="schoolResultsSubject">
                  <div>{item.code}</div>

                  <section>
                    <strong>{item.subject}</strong>
                    <small>100 Marks</small>
                  </section>
                </div>

                <strong className="schoolResultsMarks">
                  {item.marks}
                  <small>/{item.total}</small>
                </strong>

                <span
                  className={`schoolResultsGrade grade-${item.grade.replace(
                    "+",
                    "plus"
                  )}`}
                >
                  {item.grade}
                </span>

                <span className="schoolResultsRemark">
                  {item.remark}
                </span>
              </div>
            ))}
          </div>
        </div>

        <div className="schoolResultsPerformance">
          <div className="schoolResultsPerformanceHead">
            <div>
              <span>PERFORMANCE ANALYSIS</span>
              <h3>Subject-wise Progress</h3>
            </div>

            <strong>{percentage}% Overall</strong>
          </div>

          <div className="schoolResultsBars">
            {resultData.map((item) => (
              <div key={item.code}>
                <div className="schoolResultsBarInfo">
                  <span>{item.subject}</span>
                  <strong>{item.marks}%</strong>
                </div>

                <div className="schoolResultsTrack">
                  <div
                    className="schoolResultsFill"
                    style={{ width: `${item.marks}%` }}
                  ></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
};

export default Results;