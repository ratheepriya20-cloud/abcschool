import React from "react";
import {
  FaCalendarCheck,
  FaClipboardList,
  FaChartBar,
  FaMoneyBillWave,
  FaComments,
  FaArrowRight,
} from "react-icons/fa";
import "./StudentOverview.css";

const StudentOverview = ({
  student,
  attendance = [],
  assignments = [],
  results = [],
  fees = [],
  teachers = [],
  onNavigate,
}) => {
  const present =
    attendance.filter(
      (item) =>
        String(item.status)
          .toLowerCase() === "present"
    ).length;

  const percentage =
    attendance.length > 0
      ? Math.round(
          (present / attendance.length) *
            100
        )
      : 0;

  const pendingFees =
    fees.filter(
      (item) =>
        item.status === "Pending" ||
        item.status === "Overdue"
    ).length;

  return (
    <div className="stuPage">
      <section className="stuHero">
        <span>STUDENT PORTAL</span>

        <h1>
          Welcome, {student?.name}
        </h1>

        <p>
          View your latest academic records,
          assignments and school updates.
        </p>
      </section>

      <div className="stuStats">
        <div className="stuStat">
          <FaCalendarCheck />
          <span>Attendance</span>
          <strong>
            {percentage}%
          </strong>
        </div>

        <div className="stuStat">
          <FaClipboardList />
          <span>Assignments</span>
          <strong>
            {assignments.length}
          </strong>
        </div>

        <div className="stuStat">
          <FaChartBar />
          <span>Results</span>
          <strong>
            {results.length}
          </strong>
        </div>

        <div className="stuStat">
          <FaMoneyBillWave />
          <span>Pending Fees</span>
          <strong>
            {pendingFees}
          </strong>
        </div>
      </div>

      <div className="stuPanel">
        <div className="stuPanelTitle">
          <div>
            <span>QUICK ACCESS</span>
            <h2>
              Your School Information
            </h2>
          </div>
        </div>

        <div className="stuQuickGrid">
          {[
            [
              "Assignments",
              "assignments",
              FaClipboardList,
            ],
            [
              "Results",
              "results",
              FaChartBar,
            ],
            [
              "Fees",
              "fees",
              FaMoneyBillWave,
            ],
            [
              "Teacher Chat",
              "chat",
              FaComments,
            ],
          ].map(
            ([label, page, Icon]) => (
              <button
                key={page}
                className="stuQuick"
                onClick={() =>
                  onNavigate(page)
                }
              >
                <Icon />

                <strong>
                  {label}
                </strong>

                <FaArrowRight />
              </button>
            )
          )}
        </div>
      </div>

      <div className="stuPanel">
        <div className="stuPanelTitle">
          <div>
            <span>FACULTY</span>
            <h2>
              My Teachers
            </h2>
          </div>
        </div>

        {teachers.length === 0 ? (
          <div className="stuEmpty">
            No teacher assigned yet.
          </div>
        ) : (
          <div className="stuCards">
            {teachers.map((teacher) => (
              <div
                className="stuCard"
                key={teacher.id}
              >
                <strong>
                  {teacher.name}
                </strong>

                <p>
                  {teacher.subject ||
                    teacher.designation}
                </p>

                <span>
                  {teacher.email}
                </span>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default StudentOverview;