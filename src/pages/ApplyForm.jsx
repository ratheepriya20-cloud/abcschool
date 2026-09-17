
import React, { useState } from "react";
import "./ApplyForm.css";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";

const steps = [
  "Student Information",
  "Parent Information",
  "Academic Information",
  "Address & Review",
];

const classOptions = [
  "Nursery",
  "LKG",
  "UKG",
  "Class I",
  "Class II",
  "Class III",
  "Class IV",
  "Class V",
  "Class VI",
  "Class VII",
  "Class VIII",
  "Class IX",
  "Class X",
  "Class XI",
  "Class XII",
];

const ApplyForm = () => {
  const [step, setStep] = useState(0);
  const [submitted, setSubmitted] = useState(false);
  const [popupError, setPopupError] = useState("");

  const initialFormData = {
    studentName: "",
    dob: "",
    gender: "",
    classApplying: "",
    previousSchool: "",
    aadhar: "",
    nationality: "",
    category: "",
    bloodGroup: "",

    fatherName: "",
    fatherMobile: "",
    motherName: "",
    motherMobile: "",
   
  guardianRequired: "No",
  guardianName: "",
  guardianMobile: "",
  guardianEmail: "",
  guardianRelationship: "",
  guardianAddress: "",
    lastExam: "",
    marks: "",
    board: "",
    previousAddress: "",

    address: "",
    city: "",
    state: "",
    pincode: "",
    additionalInfo: "",
  };

  const [formData, setFormData] = useState(initialFormData);
  const [errors, setErrors] = useState({});

  const updateField = (name, value) => {
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    setErrors((prev) => ({
      ...prev,
      [name]: "",
    }));

    if (name === "classApplying") {
      setErrors((prev) => ({
        ...prev,
        classApplying: "",
        lastExam: "",
      }));
    }
  };

  /*
    ----------------------------------------------------
    GET PREVIOUS / PASSING CLASS
    ----------------------------------------------------
  */

  const getExpectedPassingClass = () => {
    const selectedIndex = classOptions.indexOf(formData.classApplying);

    if (selectedIndex <= 2) {
      return null;
    }

    return classOptions[selectedIndex - 1];
  };

  /*
    ----------------------------------------------------
    VALIDATE LAST EXAM PASSED
    ----------------------------------------------------
  */

  const validatePassingClass = () => {
    if (!formData.classApplying || !formData.lastExam) {
      return true;
    }

    const selectedIndex = classOptions.indexOf(formData.classApplying);

    // Nursery, LKG and UKG
    // Previous class validation not required
    if (selectedIndex <= 2) {
      return true;
    }

    const expectedPassingClass = getExpectedPassingClass();

    if (formData.lastExam !== expectedPassingClass) {
      setPopupError(
        `For admission in ${formData.classApplying}, the student must have passed ${expectedPassingClass}.`
      );

      setErrors((prev) => ({
        ...prev,
        lastExam: "Please select the correct passing class.",
      }));

      return false;
    }

    return true;
  };

  /*
    ----------------------------------------------------
    VALIDATE STEP
    ----------------------------------------------------
  */

  const validateStep = () => {
    const newErrors = {};

    /*
      STEP 1
    */

    if (step === 0) {
      if (!formData.studentName.trim()) {
        newErrors.studentName = "Student name is required";
      }

      if (!formData.dob) {
        newErrors.dob = "Date of birth is required";
      }

      if (!formData.gender) {
        newErrors.gender = "Please select gender";
      }

      if (!formData.classApplying) {
        newErrors.classApplying = "Please select class";
      }

      if (!formData.nationality) {
        newErrors.nationality = "Please select nationality";
      }
      if (!formData.category) {
  newErrors.category = "Please select category";
}

      // Aadhaar is optional
      if (
        formData.aadhar &&
        !/^\d{12}$/.test(formData.aadhar)
      ) {
        newErrors.aadhar =
          "Aadhaar number must contain exactly 12 digits";
      }
    }

    /*
      STEP 2
    */

    if (step === 1) {
      if (!formData.fatherName.trim()) {
        newErrors.fatherName = "Father's name is required";
      }

      if (!formData.fatherMobile.trim()) {
        newErrors.fatherMobile =
          "Father's mobile number is required";
      } else if (!/^\d{10}$/.test(formData.fatherMobile)) {
        newErrors.fatherMobile =
          "Please enter a valid 10 digit mobile number";
      }

      if (!formData.motherName.trim()) {
        newErrors.motherName = "Mother's name is required";
      }

      /*
        Mother mobile is OPTIONAL
      */

      if (
        formData.motherMobile &&
        !/^\d{10}$/.test(formData.motherMobile)
      ) {
        newErrors.motherMobile =
          "Please enter a valid 10 digit mobile number";
      }
if (formData.guardianRequired === "Yes") {
  if (!formData.guardianName.trim()) {
    newErrors.guardianName = "Guardian name is required";
  }

  if (!formData.guardianMobile.trim()) {
    newErrors.guardianMobile =
      "Guardian mobile number is required";
  } else if (!/^\d{10}$/.test(formData.guardianMobile)) {
    newErrors.guardianMobile =
      "Please enter a valid 10 digit mobile number";
  }

  if (!formData.guardianRelationship) {
    newErrors.guardianRelationship =
      "Please select guardian relationship";
  }
}
    }

    /*
      STEP 3
    */

    if (step === 2) {
      if (!formData.lastExam) {
        newErrors.lastExam =
          "Please select last exam passed";
      }

      /*
        Marks validation
        Allows:
        85
        85.5
        85%
      */

      if (!formData.marks.trim()) {
        newErrors.marks = "Marks are required";
      } else if (
        !/^\d{1,3}(\.\d{1,2})?%?$/.test(
          formData.marks.trim()
        )
      ) {
        newErrors.marks =
          "Please enter valid marks or percentage";
      }

      if (!formData.board) {
        newErrors.board = "Please select board";
      }

      /*
        Passing class validation
      */

      if (
        formData.classApplying &&
        formData.lastExam
      ) {
        const selectedIndex = classOptions.indexOf(
          formData.classApplying
        );

        if (selectedIndex > 2) {
          const expectedPassingClass =
            classOptions[selectedIndex - 1];

          if (
            formData.lastExam !== expectedPassingClass
          ) {
            setPopupError(
              `For admission in ${formData.classApplying}, the student must have passed ${expectedPassingClass}.`
            );

            newErrors.lastExam =
              "Invalid passing class";
          }
        }
      }
    }

    /*
      STEP 4
    */

    if (step === 3) {
      if (!formData.address.trim()) {
        newErrors.address = "Address is required";
      }

      if (!formData.city.trim()) {
        newErrors.city = "City is required";
      }

      if (!formData.state) {
        newErrors.state = "State is required";
      }

      if (!formData.pincode.trim()) {
        newErrors.pincode = "Pincode is required";
      } else if (
        !/^\d{6}$/.test(formData.pincode)
      ) {
        newErrors.pincode =
          "Pincode must contain exactly 6 digits";
      }
    }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  /*
    ----------------------------------------------------
    NEXT STEP
    ----------------------------------------------------
  */

  const nextStep = () => {
    if (!validateStep()) {
      return;
    }

    setStep((prev) =>
      Math.min(prev + 1, steps.length - 1)
    );
  };

  /*
    ----------------------------------------------------
    PREVIOUS STEP
    ----------------------------------------------------
  */

  const previousStep = () => {
    setStep((prev) => Math.max(prev - 1, 0));
  };

  /*
    ----------------------------------------------------
    SUBMIT FORM
    ----------------------------------------------------
  */

  const submitForm = () => {
    if (!validateStep()) {
      return;
    }

    setSubmitted(true);

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  /*
    ----------------------------------------------------
    RESET FORM
    ----------------------------------------------------
  */

  const resetForm = () => {
    setFormData(initialFormData);
    setErrors({});
    setPopupError("");
    setSubmitted(false);
    setStep(0);

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  /*
    ----------------------------------------------------
    INPUT
    ----------------------------------------------------
  */

  const renderInput = (
    label,
    name,
    type = "text",
    placeholder = "",
    required = false
  ) => (
    <div
      className={`field ${
        errors[name] ? "has-error" : ""
      }`}
    >
      <label>
        {label}{" "}
        {required && <span>*</span>}
      </label>

      <input
        type={type}
        value={formData[name]}
        placeholder={placeholder}
        onChange={(e) =>
          updateField(name, e.target.value)
        }
      />

      {errors[name] && (
        <small>{errors[name]}</small>
      )}
    </div>
  );

  /*
    ----------------------------------------------------
    PHONE INPUT
    ----------------------------------------------------
  */

  const renderPhoneInput = (
    label,
    name,
    placeholder,
    required = false
  ) => (
    <div
      className={`field ${
        errors[name] ? "has-error" : ""
      }`}
    >
      <label>
        {label}{" "}
        {required && <span>*</span>}
        {!required && (
          <em className="optional-text">
            Optional
          </em>
        )}
      </label>

      <input
        type="tel"
        inputMode="numeric"
        maxLength="10"
        value={formData[name]}
        placeholder={placeholder}
        onChange={(e) => {
          const value = e.target.value
            .replace(/\D/g, "")
            .slice(0, 10);

          updateField(name, value);
        }}
      />

      {errors[name] && (
        <small>{errors[name]}</small>
      )}
    </div>
  );

  /*
    ----------------------------------------------------
    SELECT
    ----------------------------------------------------
  */

  const renderSelect = (
    label,
    name,
    options,
    placeholder = "Select",
    required = false
  ) => (
    <div
      className={`field ${
        errors[name] ? "has-error" : ""
      }`}
    >
      <label>
        {label}{" "}
        {required && <span>*</span>}
      </label>

      <select
        value={formData[name]}
        onChange={(e) =>
          updateField(name, e.target.value)
        }
      >
        <option value="">
          {placeholder}
        </option>

        {options.map((item) => (
          <option
            value={item}
            key={item}
          >
            {item}
          </option>
        ))}
      </select>

      {errors[name] && (
        <small>{errors[name]}</small>
      )}
    </div>
  );

  /*
    ----------------------------------------------------
    SUCCESS PAGE
    ----------------------------------------------------
  */

  if (submitted) {
    return (
      <>
        <Navbar />

        <div className="apply-page">
          <div className="success-card">
            <div className="success-icon">
              ✓
            </div>

            <span className="success-label">
              APPLICATION RECEIVED
            </span>

            <h1>
              Application Submitted Successfully!
            </h1>

            <p>
              Thank you for applying to AB Public
              School. Your application has been
              received and is now under review.
            </p>

            <div className="application-id">
              <span>Application ID</span>
              <strong>
                ABPS20260908
              </strong>
            </div>

            <div className="success-details">
              <div>
                <span>Submitted On</span>
                <strong>
                  08 September 2026
                </strong>
              </div>

              <div>
                <span>Applied Class</span>
                <strong>
                  {formData.classApplying}
                </strong>
              </div>
            </div>

            <div className="success-actions">
              <button
                className="primary-btn"
                onClick={() =>
                  window.scrollTo({
                    top: 0,
                    behavior: "smooth",
                  })
                }
              >
                View Application
              </button>

              <button
                className="secondary-btn"
                onClick={resetForm}
              >
                New Application
              </button>
            </div>

            <div className="success-note">
              We look forward to welcoming you
              into our school family.
            </div>
          </div>
        </div>

        <Footer />
      </>
    );
  }

  return (
    <>
      <Navbar />

      {/* PASSING CLASS ERROR POPUP */}

      {popupError && (
        <div className="admission-error-overlay">
          <div className="admission-error-popup">
            <button
              className="popup-close"
              onClick={() =>
                setPopupError("")
              }
              aria-label="Close"
            >
              ×
            </button>

            <div className="admission-error-icon">
              !
            </div>

            <span className="error-popup-label">
              ADMISSION VALIDATION
            </span>

            <h3>
              Invalid Passing Class
            </h3>

            <p>{popupError}</p>

            <button
              className="popup-ok-btn"
              onClick={() => {
                setPopupError("");
                setErrors((prev) => ({
                  ...prev,
                  lastExam: "",
                }));
              }}
            >
              Okay
            </button>
          </div>
        </div>
      )}

      <div className="apply-page">
        <div className="apply-container">

          {/* LEFT PANEL */}

          <aside className="admission-panel">
            <div className="school-brand">
              <div className="school-logo">
                ✦
              </div>

              <div>
                <h3>
                  AB PUBLIC SCHOOL
                </h3>

                <p>
                  Learn • Grow • Excel
                </p>
              </div>
            </div>

            <div className="admission-content">
              <span className="mini-tag">
                ADMISSIONS OPEN
              </span>

              <h1>
                Shape Their Future With The{" "}
                <strong>
                  Right Education
                </strong>
              </h1>

              <p>
                Join a learning community that
                believes in nurturing talent,
                building character and creating
                future leaders.
              </p>

              <div className="benefits">
                <div className="benefit">
                  <div>✦</div>
                  <span>
                    World Class Infrastructure
                  </span>
                </div>

                <div className="benefit">
                  <div>✦</div>
                  <span>
                    Experienced Faculty
                  </span>
                </div>

                <div className="benefit">
                  <div>✦</div>
                  <span>
                    Holistic Development
                  </span>
                </div>

                <div className="benefit">
                  <div>✦</div>
                  <span>
                    Safe & Supportive Environment
                  </span>
                </div>
              </div>

              <div className="admission-text">
                Admissions Open
              </div>
            </div>
          </aside>

          {/* FORM PANEL */}

          <main className="form-panel">

            <div className="mobile-brand">
              <div className="school-logo">
                ✦
              </div>

              <strong>
                AB PUBLIC SCHOOL
              </strong>
            </div>

            {/* TOP */}

            <div className="form-top">
              <div>
                <span className="step-label">
                  STEP {step + 1} OF{" "}
                  {steps.length}
                </span>

                <h2>
                  {steps[step]}
                </h2>

                <p>
                  {step === 0 &&
                    "Tell us about your child"}

                  {step === 1 &&
                    "Tell us about the parents or guardian"}

                  {step === 2 &&
                    "Tell us about the academic background"}

                  {step === 3 &&
                    "Verify your details before submitting"}
                </p>
              </div>

              <div className="progress-desktop">
                {steps.map(
                  (item, index) => (
                    <React.Fragment
                      key={item}
                    >
                      <div
                        className={`progress-item ${
                          index <= step
                            ? "active"
                            : ""
                        }`}
                      >
                        <div className="progress-circle">
                          {index < step
                            ? "✓"
                            : index + 1}
                        </div>

                        <span>
                          {item}
                        </span>
                      </div>

                      {index <
                        steps.length - 1 && (
                        <div
                          className={`progress-line ${
                            index < step
                              ? "active"
                              : ""
                          }`}
                        />
                      )}
                    </React.Fragment>
                  )
                )}
              </div>
            </div>

            {/* MOBILE PROGRESS */}

            <div className="mobile-progress">
              <div className="mobile-progress-bar">
                <span
                  style={{
                    width: `${
                      ((step + 1) /
                        steps.length) *
                      100
                    }%`,
                  }}
                />
              </div>

              <div>
                Step {step + 1} of{" "}
                {steps.length}
              </div>
            </div>

            {/* FORM CONTENT */}

            <div className="form-content">

              {/* STEP 1 */}

              {step === 0 && (
                <div className="form-grid">

                  {renderInput(
                    "Full Name",
                    "studentName",
                    "text",
                    "Enter student's full name",
                    true
                  )}

                  {renderInput(
                    "Date of Birth",
                    "dob",
                    "date",
                    "",
                    true
                  )}

                  {renderSelect(
                    "Gender",
                    "gender",
                    [
                      "Male",
                      "Female",
                      "Other",
                    ],
                    "Select gender",
                    true
                  )}

                  {renderSelect(
                    "Class Applying For",
                    "classApplying",
                    classOptions,
                    "Select class",
                    true
                  )}

                  {renderInput(
                    "Previous School",
                    "previousSchool",
                    "text",
                    "Enter previous school name"
                  )}

                  {renderInput(
                    "Student Aadhaar Number",
                    "aadhar",
                    "text",
                    "12 digit Aadhaar number"
                  )}
{renderSelect(
  "Nationality",
  "nationality",
  [
    "Indian",
    "Australian",
    "American",
    "British",
    "Canadian",
    "French",
    "German",
    "Japanese",
    "Chinese",
    "Nepali",
    "Bhutanese",
    "Bangladeshi",
    "Pakistani",
    "Sri Lankan",
    "Other",
  ],
  "Select nationality",
  true
)}

                  {renderSelect(
  "Category",
  "category",
  [
    "General",
    "OBC",
    "SC",
    "ST",
    "EWS",
  ],
  "Select category",
  true
)}

                  {renderSelect(
                    "Blood Group",
                    "bloodGroup",
                    [
                      "A+",
                      "A-",
                      "B+",
                      "B-",
                      "AB+",
                      "AB-",
                      "O+",
                      "O-",
                    ],
                    "Select blood group"
                  )}

                </div>
              )}

              {/* STEP 2 */}

              {step === 1 && (
                <div className="form-grid">

                  {renderInput(
                    "Father's Name",
                    "fatherName",
                    "text",
                    "Enter father's name",
                    true
                  )}

                  {renderPhoneInput(
                    "Father's Mobile Number",
                    "fatherMobile",
                    "10 digit mobile number",
                    true
                  )}

                  {renderInput(
                    "Mother's Name",
                    "motherName",
                    "text",
                    "Enter mother's name",
                    true
                  )}

                  {renderPhoneInput(
                    "Mother's Mobile Number",
                    "motherMobile",
                    "10 digit mobile number"
                  )}

                  {renderSelect(
  "Is Guardian Applicable?",
  "guardianRequired",
  ["Yes", "No"],
  "Select option",
  true
)}

{formData.guardianRequired === "Yes" && (
  <>
    {renderInput(
      "Guardian Name",
      "guardianName",
      "text",
      "Enter guardian name",
      true
    )}

    {renderPhoneInput(
      "Guardian Mobile Number",
      "guardianMobile",
      "10 digit mobile number",
      true
    )}

    {renderInput(
      "Guardian Email",
      "guardianEmail",
      "email",
      "Enter guardian email"
    )}

    {renderSelect(
      "Guardian Relationship",
      "guardianRelationship",
      [
        "Grandfather",
        "Grandmother",
        "Uncle",
        "Aunt",
        "Brother",
        "Sister",
        "Legal Guardian",
        "Other",
      ],
      "Select relationship",
      true
    )}

    {renderInput(
      "Guardian Address",
      "guardianAddress",
      "text",
      "Enter guardian complete address"
    )}
  </>
)}

                  <div className="full-field info-box">
                    <div className="info-icon">
                      i
                    </div>

                    <div>
                      <strong>
                        Parent Information
                      </strong>

                      <p>
                        Please provide active
                        contact details. The
                        school may use these
                        details for admission
                        communication.
                      </p>
                    </div>
                  </div>

                </div>
              )}

              {/* STEP 3 */}

              {step === 2 && (
                <div className="form-grid">

                  {renderSelect(
                    "Last Exam Passed",
                    "lastExam",
                    classOptions.slice(
                      0,
                      classOptions.length - 1
                    ),
                    "Select passing class",
                    true
                  )}

                  {renderInput(
                    "Marks Obtained",
                    "marks",
                    "text",
                    "Enter marks / percentage",
                    true
                  )}

                  {renderSelect(
                    "Board",
                    "board",
                    [
                      "CBSE",
                      "ICSE",
                      "PSEB",
                      "State Board",
                      "Other",
                    ],
                    "Select board",
                    true
                  )}

                  {renderInput(
                    "Previous School Address",
                    "previousAddress",
                    "text",
                    "Enter previous school address"
                  )}

                  <div className="full-field upload-box">
                    <div className="upload-icon">
                      ↑
                    </div>

                    <strong>
                      Upload Report Card
                    </strong>

                    <p>
                      Drag & drop your file here
                      or click to browse
                    </p>

                    <span>
                      Supported formats: PDF,
                      JPG, PNG • Max 5MB
                    </span>

                    <input
                      type="file"
                      accept=".pdf,.jpg,.jpeg,.png"
                    />
                  </div>

                </div>
              )}

              {/* STEP 4 */}

              {step === 3 && (
                <div className="form-grid">

                  {renderInput(
                    "Present Address",
                    "address",
                    "text",
                    "Enter complete address",
                    true
                  )}

                  {renderInput(
                    "City",
                    "city",
                    "text",
                    "Enter city",
                    true
                  )}

                  {renderSelect(
                    "State",
                    "state",
                    [
                      "Punjab",
                      "Haryana",
                      "Delhi",
                      "Himachal Pradesh",
                      "Rajasthan",
                      "Uttar Pradesh",
                      "Maharashtra",
                      "Other",
                    ],
                    "Select state",
                    true
                  )}

                  {renderInput(
                    "Pincode",
                    "pincode",
                    "text",
                    "6 digit pincode",
                    true
                  )}

                  <div className="full-field">
                    <label>
                      Additional Information
                    </label>

                    <textarea
                      value={
                        formData.additionalInfo
                      }
                      onChange={(e) =>
                        updateField(
                          "additionalInfo",
                          e.target.value
                        )
                      }
                      placeholder="Any special request or information"
                    />
                  </div>

                  <div className="full-field terms">
                    <label className="checkbox-label">
                      <input
                        type="checkbox"
                        defaultChecked
                      />

                      <span>
                        I agree to the school's
                        admission terms and
                        conditions.
                      </span>
                    </label>
                  </div>

                </div>
              )}

            </div>

            {/* FOOTER BUTTONS */}

            <div className="form-footer">

              <button
                className="back-btn"
                onClick={previousStep}
                disabled={step === 0}
              >
                ← Back
              </button>

              {step <
              steps.length - 1 ? (
                <button
                  className="next-btn"
                  onClick={nextStep}
                >
                  Next Step{" "}
                  <span>→</span>
                </button>
              ) : (
                <button
                  className="submit-btn"
                  onClick={submitForm}
                >
                  Submit Application{" "}
                  <span>➤</span>
                </button>
              )}

            </div>

          </main>
        </div>
      </div>

      <Footer />
    </>
  );
};

export default ApplyForm;

