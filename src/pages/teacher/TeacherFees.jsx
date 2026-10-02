import React from "react";
import {
  FaMoneyBillWave,
} from "react-icons/fa";
import {
  PageHero,
  Empty,
} from "./TeacherReadComponents";
import "./TeacherFees.css";

const TeacherFees = ({
  fees = [],
  students = [],
}) => {
  const getName = (id) =>
    students.find(
      (s) =>
        String(s.id) ===
        String(id)
    )?.name || "Student";

  return (
    <div className="teacherRead-page">
      <PageHero
        eyebrow="READ ONLY"
        title="Fee Records"
        description="View fee information for your assigned students. Payment records cannot be changed from the Teacher Portal."
        icon={FaMoneyBillWave}
      />

      {fees.length ? (
        <div className="teacherRead-tableBox">
          <table className="teacherRead-table">
            <thead>
              <tr>
                <th>Student</th>
                <th>Fee</th>
                <th>Amount</th>
                <th>Status</th>
              </tr>
            </thead>

            <tbody>
              {fees.map(
                (item) => (
                  <tr key={item.id}>
                    <td>
                      <strong>
                        {getName(
                          item.studentId
                        )}
                      </strong>
                    </td>

                    <td>
                      {item.feeType ||
                        item.title ||
                        item.type ||
                        "School Fee"}
                    </td>

                    <td>
                      ₹
                      {Number(
                        item.amount || 0
                      ).toLocaleString(
                        "en-IN"
                      )}
                    </td>

                    <td>
                      <span
                        className={`teacherRead-status ${String(
                          item.status ||
                            ""
                        ).toLowerCase()}`}
                      >
                        {item.status ||
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
        <Empty text="No fee records available." />
      )}
    </div>
  );
};

export default TeacherFees;