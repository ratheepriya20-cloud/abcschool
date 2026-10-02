import React from "react";
import "./StudentProfile.css";

const StudentProfile = ({
  student,
}) => {
  const fields = [
    [
      "Student Name",
      student?.name,
    ],
    [
      "Admission No.",
      student?.admissionNo,
    ],
    [
      "Class",
      student?.className,
    ],
    [
      "Section",
      student?.section,
    ],
    [
      "Roll No.",
      student?.rollNo,
    ],
    [
      "Gender",
      student?.gender,
    ],
    [
      "Date of Birth",
      student?.dob,
    ],
    [
      "Status",
      student?.status,
    ],
  ];

  return (
    <div className="stuPage">
      <section className="stuHero small">
        <span>MY ACCOUNT</span>
        <h1>Student Profile</h1>
        <p>
          Your official school profile.
        </p>
      </section>

      <div className="stuProfile">
        {fields.map(
          ([label, value]) => (
            <div key={label}>
              <span>{label}</span>
              <strong>
                {value || "-"}
              </strong>
            </div>
          )
        )}
      </div>
    </div>
  );
};

export default StudentProfile;