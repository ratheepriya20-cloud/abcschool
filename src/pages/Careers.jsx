import React, { useState } from "react";
import {
  FaBriefcase,
  FaGraduationCap,
  FaUsers,
  FaChartLine,
  FaHeart,
  FaCheckCircle,
  FaArrowRight,
  FaMapMarkerAlt,
  FaClock,
  FaFileUpload,
  FaPaperPlane,
  FaTimes,
} from "react-icons/fa";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import "./Careers.css";

const openings = [
  {
    title: "PGT Mathematics",
    department: "Mathematics",
    experience: "2–5 Years",
    type: "Full Time",
  },
  {
    title: "PGT Physics",
    department: "Science",
    experience: "2–5 Years",
    type: "Full Time",
  },
  {
    title: "TGT English",
    department: "Languages",
    experience: "1–4 Years",
    type: "Full Time",
  },
  {
    title: "TGT Science",
    department: "Science",
    experience: "1–4 Years",
    type: "Full Time",
  },
  {
    title: "Primary Teacher",
    department: "Primary Wing",
    experience: "1–3 Years",
    type: "Full Time",
  },
  {
    title: "Computer Teacher",
    department: "Technology",
    experience: "1–4 Years",
    type: "Full Time",
  },
];

const benefits = [
  {
    icon: <FaUsers />,
    title: "Supportive Environment",
    text: "Work with a collaborative and encouraging team of educators.",
  },
  {
    icon: <FaChartLine />,
    title: "Professional Growth",
    text: "Grow your teaching skills through training and development opportunities.",
  },
  {
    icon: <FaGraduationCap />,
    title: "Learning Culture",
    text: "Be part of a school that values continuous learning and innovation.",
  },
  {
    icon: <FaHeart />,
    title: "Meaningful Impact",
    text: "Make a positive difference in the academic and personal growth of students.",
  },
];

const Careers = () => {
  const [selectedJob, setSelectedJob] = useState("");
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    position: "",
    qualification: "",
    experience: "",
    message: "",
  });

  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    setErrors((prev) => ({
      ...prev,
      [name]: "",
    }));
  };

  const handleApply = (job) => {
    setSelectedJob(job.title);

    setFormData((prev) => ({
      ...prev,
      position: job.title,
    }));

    document
      .getElementById("career-application")
      ?.scrollIntoView({ behavior: "smooth" });
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = "Please enter your full name.";
    }

    if (!formData.email.trim()) {
      newErrors.email = "Please enter your email address.";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Please enter a valid email address.";
    }

    if (!formData.phone.trim()) {
      newErrors.phone = "Please enter your phone number.";
    } else if (!/^[0-9]{10}$/.test(formData.phone)) {
      newErrors.phone = "Phone number must be 10 digits.";
    }

    if (!formData.position) {
      newErrors.position = "Please select a position.";
    }

    if (!formData.qualification.trim()) {
      newErrors.qualification = "Please enter your qualification.";
    }

    if (!formData.experience.trim()) {
      newErrors.experience = "Please enter your experience.";
    }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    setSubmitted(true);
  };

  const closeSuccess = () => {
    setSubmitted(false);

    setFormData({
      name: "",
      email: "",
      phone: "",
      position: "",
      qualification: "",
      experience: "",
      message: "",
    });

    setSelectedJob("");
  };

  return (
    <>
      <Navbar />

      <main className="abcareer-page">

        <section className="abcareer-hero">
          <div className="abcareer-hero-overlay"></div>

          <div className="abcareer-hero-content">
            <span className="abcareer-eyebrow">
              <FaBriefcase />
              CAREER OPPORTUNITIES
            </span>

            <h1>
              Build Your Career
              <span> With Us</span>
            </h1>

            <p>
              Join a passionate team of educators dedicated to shaping
              confident, capable and responsible young minds.
            </p>

            <a href="#career-openings" className="abcareer-hero-btn">
              View Open Positions
              <FaArrowRight />
            </a>
          </div>
        </section>

        <section className="abcareer-intro">
          <div className="abcareer-section-heading">
            <span>WHY JOIN US</span>
            <h2>Grow, Inspire & Make a Difference</h2>
            <p>
              At AB Public School, we believe great teachers create great
              possibilities. Join a professional community where your work
              truly matters.
            </p>
          </div>

          <div className="abcareer-benefit-grid">
            {benefits.map((item, index) => (
              <div className="abcareer-benefit-card" key={index}>
                <div className="abcareer-benefit-icon">
                  {item.icon}
                </div>

                <h3>{item.title}</h3>

                <p>{item.text}</p>
              </div>
            ))}
          </div>
        </section>

        <section
          className="abcareer-openings"
          id="career-openings"
        >
          <div className="abcareer-section-heading">
            <span>CURRENT OPENINGS</span>
            <h2>Explore Career Opportunities</h2>
            <p>
              Discover opportunities to become a part of our growing
              academic community.
            </p>
          </div>

          <div className="abcareer-job-grid">
            {openings.map((job, index) => (
              <div className="abcareer-job-card" key={index}>

                <div className="abcareer-job-top">
                  <div className="abcareer-job-icon">
                    <FaGraduationCap />
                  </div>

                  <span className="abcareer-job-type">
                    {job.type}
                  </span>
                </div>

                <h3>{job.title}</h3>

                <p className="abcareer-department">
                  {job.department}
                </p>

                <div className="abcareer-job-info">
                  <span>
                    <FaBriefcase />
                    {job.experience}
                  </span>

                  <span>
                    <FaMapMarkerAlt />
                    Rohtak
                  </span>
                </div>

                <button
                  type="button"
                  className="abcareer-apply-btn"
                  onClick={() => handleApply(job)}
                >
                  Apply Now
                  <FaArrowRight />
                </button>
              </div>
            ))}
          </div>
        </section>

        <section className="abcareer-values">
          <div className="abcareer-values-content">
            <span>WHAT WE LOOK FOR</span>

            <h2>
              Be Part of a Team That
              <strong> Inspires Students</strong>
            </h2>

            <p>
              We welcome educators who bring knowledge, creativity,
              compassion and a genuine commitment to student success.
            </p>

            <div className="abcareer-check-list">
              <div>
                <FaCheckCircle />
                Strong subject knowledge
              </div>

              <div>
                <FaCheckCircle />
                Excellent communication skills
              </div>

              <div>
                <FaCheckCircle />
                Student-focused teaching approach
              </div>

              <div>
                <FaCheckCircle />
                Positive and professional attitude
              </div>

              <div>
                <FaCheckCircle />
                Commitment to school values
              </div>

              <div>
                <FaCheckCircle />
                Passion for continuous learning
              </div>
            </div>
          </div>

          <div className="abcareer-values-card">
            <div className="abcareer-values-card-icon">
              <FaGraduationCap />
            </div>

            <h3>Shape the Future</h3>

            <p>
              Your classroom can become the place where a student's
              confidence, curiosity and dreams begin.
            </p>

            <span>AB Public School</span>
          </div>
        </section>

        <section className="abcareer-application" id="career-application">
          <div className="abcareer-application-heading">
            <span>JOIN OUR TEAM</span>

            <h2>Start Your Journey With Us</h2>

            <p>
              Didn't find the right opening? You can still share your
              profile with our school team.
            </p>
          </div>

          <form
            className="abcareer-form"
            onSubmit={handleSubmit}
          >
            <div className="abcareer-form-grid">

              <div className="abcareer-field">
                <label>Full Name *</label>

                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Enter your full name"
                />

                {errors.name && (
                  <small>{errors.name}</small>
                )}
              </div>

              <div className="abcareer-field">
                <label>Email Address *</label>

                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Enter your email"
                />

                {errors.email && (
                  <small>{errors.email}</small>
                )}
              </div>

              <div className="abcareer-field">
                <label>Phone Number *</label>

                <input
                  type="text"
                  name="phone"
                  value={formData.phone}
                  maxLength="10"
                  onChange={(e) => {
                    const value = e.target.value.replace(/\D/g, "");

                    setFormData((prev) => ({
                      ...prev,
                      phone: value,
                    }));

                    setErrors((prev) => ({
                      ...prev,
                      phone: "",
                    }));
                  }}
                  placeholder="10 digit phone number"
                />

                {errors.phone && (
                  <small>{errors.phone}</small>
                )}
              </div>

              <div className="abcareer-field">
                <label>Position Applied For *</label>

                <select
                  name="position"
                  value={formData.position}
                  onChange={handleChange}
                >
                  <option value="">Select position</option>

                  {openings.map((job, index) => (
                    <option key={index} value={job.title}>
                      {job.title}
                    </option>
                  ))}
                </select>

                {errors.position && (
                  <small>{errors.position}</small>
                )}
              </div>

              <div className="abcareer-field">
                <label>Highest Qualification *</label>

                <input
                  type="text"
                  name="qualification"
                  value={formData.qualification}
                  onChange={handleChange}
                  placeholder="e.g. M.Sc, M.A, B.Ed"
                />

                {errors.qualification && (
                  <small>{errors.qualification}</small>
                )}
              </div>

              <div className="abcareer-field">
                <label>Teaching Experience *</label>

                <input
                  type="text"
                  name="experience"
                  value={formData.experience}
                  onChange={handleChange}
                  placeholder="e.g. 3 Years"
                />

                {errors.experience && (
                  <small>{errors.experience}</small>
                )}
              </div>

              <div className="abcareer-field abcareer-full-field">
                <label>Message</label>

                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="Tell us briefly about yourself..."
                  rows="4"
                ></textarea>
              </div>

            </div>

            <div className="abcareer-resume-box">
              <FaFileUpload />

              <div>
                <strong>Resume / CV</strong>
                <p>
                  Please keep your updated resume ready for the
                  recruitment process.
                </p>
              </div>
            </div>

            <button
              type="submit"
              className="abcareer-submit-btn"
            >
              <FaPaperPlane />
              Submit Application
            </button>
          </form>
        </section>

      </main>

      {submitted && (
        <div className="abcareer-popup-overlay">
          <div className="abcareer-success-popup">

            <button
              type="button"
              className="abcareer-popup-close"
              onClick={closeSuccess}
            >
              <FaTimes />
            </button>

            <div className="abcareer-success-icon">
              <FaCheckCircle />
            </div>

            <h2>Application Submitted!</h2>

            <p>
              Thank you for your interest in joining AB Public School.
              Our team will review your application and contact you
              if your profile is shortlisted.
            </p>

            {selectedJob && (
              <div className="abcareer-selected-job">
                <span>Applied Position</span>
                <strong>{selectedJob}</strong>
              </div>
            )}

            <button
              type="button"
              className="abcareer-popup-btn"
              onClick={closeSuccess}
            >
              Continue
            </button>
          </div>
        </div>
      )}

      <Footer />
    </>
  );
};

export default Careers;