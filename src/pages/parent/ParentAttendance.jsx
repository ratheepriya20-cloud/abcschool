import React, { useMemo } from "react";

import {
  FaCalendarCheck,
  FaCheckCircle,
  FaTimesCircle,
  FaChartPie,
} from "react-icons/fa";

import "./ParentAttendance.css";
const ParentAttendance = ({
  student,
  attendance = [],
}) => {

  const totals = useMemo(() => {

    const workingDays =
      attendance.reduce(
        (sum, item) =>
          sum +
          Number(item.workingDays || 0),
        0
      );

    const present =
      attendance.reduce(
        (sum, item) =>
          sum +
          Number(item.present || 0),
        0
      );

    const absent =
      attendance.reduce(
        (sum, item) =>
          sum +
          Number(item.absent || 0),
        0
      );

    const percentage =
      workingDays
        ? Math.round(
            (present / workingDays) *
              100
          )
        : 0;

    return {
      workingDays,
      present,
      absent,
      percentage,
    };

  }, [attendance]);


  return (
    <div className="pp-page">

      <PageHero
        label="ATTENDANCE RECORD"
        title="Student Attendance"
        description={`Monthly attendance details for ${
          student?.name || "your child"
        }.`}
      />


      <section className="pp-summary-grid">

        <SummaryCard
          icon={FaCalendarCheck}
          value={totals.workingDays}
          title="Working Days"
        />

        <SummaryCard
          icon={FaCheckCircle}
          value={totals.present}
          title="Present Days"
        />

        <SummaryCard
          icon={FaTimesCircle}
          value={totals.absent}
          title="Absent Days"
        />

        <SummaryCard
          icon={FaChartPie}
          value={`${totals.percentage}%`}
          title="Overall Attendance"
        />

      </section>


      <section className="pp-table-card">

        <div className="pp-section-heading">

          <span>
            MONTHLY RECORD
          </span>

          <h2>
            Attendance Details
          </h2>

          <p>
            Complete month-wise attendance
            summary for the academic session.
          </p>

        </div>


        <div className="pp-table-wrap">

          <table className="pp-table">

            <thead>
              <tr>
                <th>Month</th>
                <th>Working Days</th>
                <th>Present</th>
                <th>Absent</th>
                <th>Attendance</th>
              </tr>
            </thead>

            <tbody>

              {attendance.map(
                (item) => (

                  <tr key={item.id}>

                    <td>
                      <strong>
                        {item.month}
                      </strong>
                    </td>

                    <td>
                      {item.workingDays}
                    </td>

                    <td>
                      {item.present}
                    </td>

                    <td>
                      {item.absent}
                    </td>

                    <td>

                      <span
                        className={`pp-percentage ${
                          Number(
                            item.percentage
                          ) >= 90
                            ? "good"
                            : "average"
                        }`}
                      >
                        {item.percentage}%
                      </span>

                    </td>

                  </tr>

                )
              )}

            </tbody>

          </table>

        </div>

      </section>

    </div>
  );
};


const PageHero = ({
  label,
  title,
  description,
}) => (
  <section className="pp-page-hero">

    <span className="pp-eyebrow">
      {label}
    </span>

    <h1>{title}</h1>

    <p>{description}</p>

  </section>
);


const SummaryCard = ({
  icon: Icon,
  value,
  title,
}) => (
  <article className="pp-summary-card">

    <span>
      <Icon />
    </span>

    <div>
      <strong>{value}</strong>
      <p>{title}</p>
    </div>

  </article>
);


export default ParentAttendance;