
import React from "react";
import "./ParentAttendance.css";

const ParentAttendance = () => {
  const attendance = [
    {
      month: "April 2026",
      present: 22,
      absent: 1,
      percentage: 95.6,
    },
    {
      month: "May 2026",
      present: 21,
      absent: 2,
      percentage: 91.3,
    },
    {
      month: "June 2026",
      present: 20,
      absent: 1,
      percentage: 95.2,
    },
    {
      month: "July 2026",
      present: 19,
      absent: 2,
      percentage: 90.4,
    },
    {
      month: "August 2026",
      present: 22,
      absent: 1,
      percentage: 95.6,
    },
    {
      month: "September 2026",
      present: 8,
      absent: 1,
      percentage: 88.9,
    },
  ];

  return (
    <div className="abattendance-page">
      <div className="abattendance-heading">
        <span className="abattendance-section-label">
          STUDENT RECORD
        </span>

        <h1>Attendance</h1>

        <p>
          Track your child's monthly school attendance.
        </p>
      </div>

      <div className="abattendance-highlight">
        <div className="abattendance-highlight-content">
          <span>Overall Attendance</span>

          <strong>92%</strong>

          <small>
            Excellent attendance record
          </small>
        </div>

        <div className="abattendance-circle">
          <div className="abattendance-circle-inner">
            <span>92%</span>
            <small>Overall</small>
          </div>
        </div>
      </div>

      <div className="abattendance-panel">
        <div className="abattendance-panel-header">
          <div>
            <span className="abattendance-section-label">
              MONTHLY REPORT
            </span>

            <h2>Attendance History</h2>
          </div>
        </div>

        <div className="abattendance-table-wrap">
          <table className="abattendance-table">
            <thead>
              <tr>
                <th>Month</th>
                <th>Present</th>
                <th>Absent</th>
                <th>Attendance</th>
              </tr>
            </thead>

            <tbody>
              {attendance.map((item) => (
                <tr key={item.month}>
                  <td>
                    <strong>{item.month}</strong>
                  </td>

                  <td>
                    <span className="abattendance-present">
                      {item.present} Days
                    </span>
                  </td>

                  <td>
                    <span className="abattendance-absent">
                      {item.absent} Days
                    </span>
                  </td>

                  <td>
                    <div className="abattendance-progress-cell">
                      <div className="abattendance-progress">
                        <span
                          style={{
                            width: `${item.percentage}%`,
                          }}
                        />
                      </div>

                      <strong>
                        {item.percentage}%
                      </strong>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="abattendance-note">
        <div className="abattendance-note-title">
          <strong>Attendance Reminder</strong>
        </div>

        <p>
          Regular attendance plays an important role in
          academic performance. Please ensure your child
          attends school regularly.
        </p>
      </div>
    </div>
  );
};

export default ParentAttendance;

