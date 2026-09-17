import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  FaArrowRight,
  FaGraduationCap,
  FaChalkboardTeacher,
  FaBookOpen,
  FaAward,
  FaUsers,
  FaSearch,
  FaEnvelope,
  FaStar,
} from "react-icons/fa";

import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import "./Teachers.css";
import teacherMain from "../assets/teacher-main.jpg";
import teacher1 from "../assets/teacher-1.jpg";
import teacher2 from "../assets/teacher-2.jpg";
import teacher3 from "../assets/teacher-3.jpg";
import teacher4 from "../assets/teacher-4.jpg";
import teacher5 from "../assets/teacher-5.jpg";
import teacher6 from "../assets/teacher-6.jpg";
import teacher7 from "../assets/teacher-7.jpg";
import teacher8 from "../assets/teacher-8.jpg";


const teachersData = [
  {
    name: "Dr. Anjali Sharma",
    role: "Principal & Academic Head",
    department: "Leadership",
    experience: "18+ Years",
    qualification: "M.Ed., Ph.D.",
    subject: "Academic Leadership",
    image: teacherMain,
    description:
      "Leading our academic vision with experience, compassion and a strong commitment to student success.",
  },

  {
    name: "Mr. Rajiv Mehta",
    role: "Senior Mathematics Teacher",
    department: "Mathematics",
    experience: "14+ Years",
    qualification: "M.Sc., B.Ed.",
    subject: "Mathematics",
    image: teacher8,
    description:
      "Making mathematics engaging through practical learning, logical thinking and problem-solving.",
  },

  {
    name: "Mrs. Neha Kapoor",
    role: "Senior Science Teacher",
    department: "Science",
    experience: "12+ Years",
    qualification: "M.Sc., B.Ed.",
    subject: "Science",
    image: teacher3,
    description:
      "Encouraging curiosity and scientific thinking through experiments and activity-based learning.",
  },

  {
    name: "Mr. Arjun Verma",
    role: "Computer Science Teacher",
    department: "Technology",
    experience: "10+ Years",
    qualification: "M.Tech., B.Ed.",
    subject: "Computer Science",
    image: teacher4,
    description:
      "Preparing students for the digital future through coding, technology and innovative projects.",
  },

  {
    name: "Mrs. Pooja Malhotra",
    role: "English & Communication Teacher",
    department: "Languages",
    experience: "11+ Years",
    qualification: "M.A., B.Ed.",
    subject: "English",
    image: teacher5,
    description:
      "Building confident communicators through creative writing, literature and effective expression.",
  },

  {
    name: "Mr. Vivek Singh",
    role: "Social Science Teacher",
    department: "Humanities",
    experience: "9+ Years",
    qualification: "M.A., B.Ed.",
    subject: "Social Science",
    image: teacher6,
    description:
      "Helping students understand society, history and the world through meaningful discussions.",
  },

  {
    name: "Mrs. Ritu Bansal",
    role: "Primary School Teacher",
    department: "Primary",
    experience: "13+ Years",
    qualification: "M.A., B.Ed.",
    subject: "Primary Education",
    image: teacher7,
    description:
      "Creating a joyful and supportive learning environment where young minds can grow confidently.",
  },

  {
    name: "Mr. Karan Arora",
    role: "Physical Education Teacher",
    department: "Sports",
    experience: "8+ Years",
    qualification: "M.P.Ed.",
    subject: "Physical Education",
    image: teacher1,
    description:
      "Promoting fitness, teamwork, discipline and a healthy lifestyle through sports and activities.",
  },
];

const departments = [
  "All",
  "Leadership",
  "Mathematics",
  "Science",
  "Technology",
  "Languages",
  "Humanities",
  "Primary",
  "Sports",
];

const Teachers = () => {
  const [activeDepartment, setActiveDepartment] = useState("All");
  const [searchTerm, setSearchTerm] = useState("");

  const filteredTeachers = teachersData.filter((teacher) => {
    const matchesDepartment =
      activeDepartment === "All" ||
      teacher.department === activeDepartment;

    const matchesSearch =
      teacher.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      teacher.subject.toLowerCase().includes(searchTerm.toLowerCase()) ||
      teacher.role.toLowerCase().includes(searchTerm.toLowerCase());

    return matchesDepartment && matchesSearch;
  });

  return (
    <div className="abteachers-page">
      <Navbar />

      {/* =====================================================
          HERO
      ===================================================== */}

      <section className="abteachers-hero">
        <div className="abteachers-hero-orbit abteachers-orbit-one"></div>
        <div className="abteachers-hero-orbit abteachers-orbit-two"></div>
        <div className="abteachers-hero-dot abteachers-dot-one"></div>
        <div className="abteachers-hero-dot abteachers-dot-two"></div>

        <div className="abteachers-container">
          <div className="abteachers-breadcrumb">
            <Link to="/">Home</Link>
            <span>/</span>
            <span>Teachers</span>
          </div>

          <div className="abteachers-hero-grid">
            <div className="abteachers-hero-content">
              <span className="abteachers-eyebrow">
                OUR TEACHING COMMUNITY
              </span>

              <h1>
                Inspiring Minds.
                <span> Shaping Futures.</span>
              </h1>

              <p>
                Meet the dedicated educators who bring knowledge, creativity
                and compassion into every classroom. Our teachers inspire
                students to think deeply, explore confidently and achieve
                their potential.
              </p>

              <div className="abteachers-hero-buttons">
                <a href="#teachers" className="abteachers-btn-primary">
                  Meet Our Teachers
                  <FaArrowRight />
                </a>

                <Link to="/contact" className="abteachers-btn-outline">
                  Contact School
                </Link>
              </div>

              <div className="abteachers-hero-points">
                <span>
                  <FaGraduationCap />
                  Qualified Educators
                </span>

                <span>
                  <FaAward />
                  Experienced Faculty
                </span>

                <span>
                  <FaUsers />
                  Student Focused
                </span>
              </div>
            </div>

            {/* HERO VISUAL */}

            <div className="abteachers-hero-visual">
              <div className="abteachers-main-teacher-card">
                <div className="abteachers-image-wrap">
                  <img
                    src={teacherMain}
                    alt="School Teacher"
                  />

                  <div className="abteachers-image-badge">
                    <FaStar />
                    <span>Dedicated To Excellence</span>
                  </div>
                </div>

                <div className="abteachers-visual-info">
                  <small>OUR FACULTY</small>
                  <h3>Teachers Who Make A Difference.</h3>
                  <p>
                    Guiding students with knowledge, patience and purpose.
                  </p>
                </div>
              </div>

              <div className="abteachers-floating-card">
                <FaChalkboardTeacher />
                <div>
                  <strong>50+</strong>
                  <span>Expert Educators</span>
                </div>
              </div>

              <div className="abteachers-floating-mini">
                <FaGraduationCap />
                <span>Learn • Grow • Lead</span>
              </div>
            </div>
          </div>
        </div>
      </section>


      {/* =====================================================
          INTRO
      ===================================================== */}

      <section className="abteachers-intro">
        <div className="abteachers-container">
          <div className="abteachers-intro-grid">
            <div>
              <span className="abteachers-section-label">
                BEYOND THE CLASSROOM
              </span>

              <h2>
                Teachers Who Teach,
                <br />
                Mentors Who Inspire.
              </h2>
            </div>

            <div className="abteachers-intro-copy">
              <p>
                At our school, teachers are more than subject experts. They
                are mentors, role models and lifelong learners who understand
                that every child has a unique way of learning.
              </p>

              <p>
                Through engaging lessons, personal guidance and meaningful
                interactions, our faculty creates an environment where
                students feel supported, challenged and inspired.
              </p>
            </div>
          </div>
        </div>
      </section>


      {/* =====================================================
          STATS
      ===================================================== */}

      <section className="abteachers-stats">
        <div className="abteachers-container">
          <div className="abteachers-stats-grid">

            <div className="abteachers-stat">
              <FaChalkboardTeacher />
              <strong>50+</strong>
              <span>Expert Educators</span>
            </div>

            <div className="abteachers-stat">
              <FaGraduationCap />
              <strong>90%</strong>
              <span>Post Graduate Faculty</span>
            </div>

            <div className="abteachers-stat">
              <FaAward />
              <strong>10+</strong>
              <span>Years Average Experience</span>
            </div>

            <div className="abteachers-stat">
              <FaUsers />
              <strong>1 : 20</strong>
              <span>Teacher Student Support</span>
            </div>

          </div>
        </div>
      </section>


      {/* =====================================================
          TEACHERS
      ===================================================== */}

      <section className="abteachers-faculty" id="teachers">
        <div className="abteachers-container">

          <div className="abteachers-section-header">
            <div>
              <span className="abteachers-section-label">
                MEET OUR FACULTY
              </span>

              <h2>
                The People Behind
                <span> Every Success.</span>
              </h2>
            </div>

            <p>
              Our diverse team of educators brings expertise, experience and
              a genuine passion for helping students succeed.
            </p>
          </div>


          {/* FILTER */}

          <div className="abteachers-controls">

            <div className="abteachers-departments">
              {departments.map((department) => (
                <button
                  key={department}
                  className={
                    activeDepartment === department
                      ? "active"
                      : ""
                  }
                  onClick={() => setActiveDepartment(department)}
                >
                  {department}
                </button>
              ))}
            </div>

            <div className="abteachers-search">
              <FaSearch />

              <input
                type="text"
                placeholder="Search teacher..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>

          </div>


          {/* CARDS */}

          <div className="abteachers-grid">

            {filteredTeachers.length > 0 ? (
              filteredTeachers.map((teacher, index) => (
                <article
                  className="abteachers-card"
                  key={teacher.name}
                >

                  <div className="abteachers-card-image">

                    <img
                      src={teacher.image}
                      alt={teacher.name}
                      onError={(e) => {
                        e.currentTarget.style.display = "none";
                        e.currentTarget.parentElement.classList.add(
                          "abteachers-image-fallback"
                        );
                      }}
                    />

                    <div className="abteachers-card-number">
                      {String(index + 1).padStart(2, "0")}
                    </div>

                    <div className="abteachers-subject">
                      {teacher.subject}
                    </div>

                  </div>

                  <div className="abteachers-card-content">

                    <span className="abteachers-role">
                      {teacher.role}
                    </span>

                    <h3>{teacher.name}</h3>

                    <p>{teacher.description}</p>

                    <div className="abteachers-details">

                      <div>
                        <FaGraduationCap />
                        <span>{teacher.qualification}</span>
                      </div>

                      <div>
                        <FaAward />
                        <span>{teacher.experience}</span>
                      </div>

                    </div>

                    <div className="abteachers-card-footer">
                      <span>
                        {teacher.department}
                      </span>

                      <Link to="/contact">
                        <FaEnvelope />
                      </Link>
                    </div>

                  </div>

                </article>
              ))
            ) : (
              <div className="abteachers-empty">
                <FaSearch />
                <h3>No Teachers Found</h3>
                <p>
                  Try searching with a different name, subject or department.
                </p>
              </div>
            )}

          </div>
        </div>
      </section>


      {/* =====================================================
          TEACHING APPROACH
      ===================================================== */}

      <section className="abteachers-approach">
        <div className="abteachers-container">

          <div className="abteachers-approach-grid">

            <div className="abteachers-approach-content">
              <span className="abteachers-section-label">
                OUR APPROACH
              </span>

              <h2>
                Teaching With
                <span> Purpose.</span>
              </h2>

              <p>
                We believe great teaching combines strong subject knowledge
                with empathy, curiosity and meaningful relationships.
              </p>

              <div className="abteachers-approach-list">

                <div>
                  <span>01</span>
                  <div>
                    <h3>Understand</h3>
                    <p>
                      Understanding every student's learning style and needs.
                    </p>
                  </div>
                </div>

                <div>
                  <span>02</span>
                  <div>
                    <h3>Engage</h3>
                    <p>
                      Creating classrooms where students actively participate.
                    </p>
                  </div>
                </div>

                <div>
                  <span>03</span>
                  <div>
                    <h3>Inspire</h3>
                    <p>
                      Encouraging students to explore beyond textbooks.
                    </p>
                  </div>
                </div>

              </div>
            </div>


            <div className="abteachers-approach-visual">

              <div className="abteachers-learning-card">

                <div className="abteachers-learning-icon">
                  <FaBookOpen />
                </div>

                <small>THE LEARNING EXPERIENCE</small>

                <h3>
                  Knowledge becomes powerful when it inspires action.
                </h3>

                <div className="abteachers-progress">
                  <span>
                    Student Growth
                  </span>

                  <strong>92%</strong>

                  <div>
                    <i></i>
                  </div>
                </div>

              </div>

            </div>

          </div>
        </div>
      </section>


      {/* =====================================================
          CTA
      ===================================================== */}

      <section className="abteachers-cta">

        <div className="abteachers-cta-circle"></div>

        <div className="abteachers-container">
          <div className="abteachers-cta-inner">

            <div>
              <small>JOIN OUR LEARNING COMMUNITY</small>

              <h2>
                Great Teachers.
                <br />
                Greater Possibilities.
              </h2>

              <p>
                Discover a school where passionate educators and curious
                learners grow together.
              </p>
            </div>

            <Link
              to="/admission"
              className="abteachers-cta-button"
            >
              Explore Admissions
              <FaArrowRight />
            </Link>

          </div>
        </div>

      </section>


      <Footer />
    </div>
  );
};

export default Teachers;