import React from "react";
import "./StudentFees.css";

const StudentFees = ({
  fees = [],
}) => {
  return (
    <div className="stuPage">
      <section className="stuHero small">
        <span>FEE RECORD</span>
        <h1>My Fees</h1>
        <p>
          View your fee payment status.
        </p>
      </section>

      {fees.length === 0 ? (
        <div className="stuEmpty">
          No fee record available.
        </div>
      ) : (
        <div className="stuCards">
          {fees.map((fee, index) => (
            <article
              className="stuCard"
              key={fee.id || index}
            >
              <div className="stuCardTop">
                <span>
                  Fee Details
                </span>

                <span
                  className={`stuStatus ${String(
                    fee.status
                  ).toLowerCase()}`}
                >
                  {fee.status}
                </span>
              </div>

              <h3>
                {fee.title ||
                  fee.feeType ||
                  "School Fee"}
              </h3>

              <strong className="stuAmount">
                ₹
                {Number(
                  fee.amount || 0
                ).toLocaleString(
                  "en-IN"
                )}
              </strong>

              {fee.dueDate && (
                <p>
                  Due Date:{" "}
                  {fee.dueDate}
                </p>
              )}
            </article>
          ))}
        </div>
      )}
    </div>
  );
};

export default StudentFees;