import React, { useMemo } from "react";

import {
  FaChartBar,
  FaBookOpen,
  FaAward,
  FaGraduationCap,
} from "react-icons/fa";

import "./ParentResults.css";

const ParentResults = ({
  student,
  results = [],
}) => {

  const average = useMemo(() => {

    if (!results.length) {
      return 0;
    }

    const totalMarks =
      results.reduce(
        (sum, item) =>
          sum +
          Number(item.marks || 0),
        0
      );

    const maximum =
      results.reduce(
        (sum, item) =>
          sum +
          Number(
            item.totalMarks || 100
          ),
        0
      );

    return maximum
      ? Math.round(
          (totalMarks / maximum) *
            100
        )
      : 0;

  }, [results]);


  const highest = useMemo(() => {

    if (!results.length) {
      return null;
    }

    return [...results].sort(
      (a, b) =>
        Number(b.marks) -
        Number(a.marks)
    )[0];

  }, [results]);


  return (
    <div className="pp-page">

      <section className="pp-page-hero">

        <span className="pp-eyebrow">
          ACADEMIC PERFORMANCE
        </span>

        <h1>
          Examination Results
        </h1>

        <p>
          Subject-wise academic performance
          and examination results for{" "}
          {student?.name || "your child"}.
        </p>

      </section>


      <section className="pp-summary-grid">

        <ResultSummary
          icon={FaChartBar}
          value={`${average}%`}
          label="Overall Score"
        />

        <ResultSummary
          icon={FaBookOpen}
          value={results.length}
          label="Subjects"
        />

        <ResultSummary
          icon={FaAward}
          value={
            highest?.marks || 0
          }
          label="Highest Marks"
        />

        <ResultSummary
          icon={FaGraduationCap}
          value={
            highest?.subject || "—"
          }
          label="Best Subject"
        />

      </section>


      <section className="pp-card">

        <div className="pp-section-heading">

          <span>
            SUBJECT REPORT
          </span>

          <h2>
            Result Details
          </h2>

          <p>
            Complete subject-wise marks
            and grades.
          </p>

        </div>


        <div className="pp-results-grid">

          {results.map(
            (result) => {

              const percentage =
                Math.round(
                  (
                    Number(
                      result.marks
                    ) /
                    Number(
                      result.totalMarks ||
                        100
                    )
                  ) *
                    100
                );

              return (

                <article
                  className="pp-result-card"
                  key={result.id}
                >

                  <div className="pp-result-top">

                    <span>
                      <FaBookOpen />
                    </span>

                    <strong>
                      {result.grade}
                    </strong>

                  </div>


                  <h3>
                    {result.subject}
                  </h3>


                  <div className="pp-result-score">

                    <strong>
                      {result.marks}
                    </strong>

                    <span>
                      /
                      {result.totalMarks ||
                        100}
                    </span>

                  </div>


                  <div className="pp-progress">

                    <span
                      style={{
                        width:
                          `${percentage}%`,
                      }}
                    />

                  </div>


                  <p>
                    {percentage}% Score
                  </p>

                </article>

              );
            }
          )}

        </div>

      </section>

    </div>
  );
};


const ResultSummary = ({
  icon: Icon,
  value,
  label,
}) => (
  <article className="pp-summary-card">

    <span>
      <Icon />
    </span>

    <div>
      <strong>{value}</strong>
      <p>{label}</p>
    </div>

  </article>
);


export default ParentResults;