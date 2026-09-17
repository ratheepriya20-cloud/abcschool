import React from "react";
import { useNavigate } from "react-router-dom";
import {
  FaUsers,
  FaUserTie,
  FaStar,
  FaLayerGroup,
  FaGraduationCap,
  FaBookOpen,
  FaAward,
  FaChalkboardTeacher,
  FaArrowRight,
  FaBriefcase,
  FaQuoteLeft,
  FaFlask,
  FaCalculator,
  FaLanguage,
  FaFutbol,
  FaPalette,
  FaLaptopCode,
  FaLeaf,
  FaCheckCircle
} from "react-icons/fa";

import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import "./Faculty.css";

import teacher1 from "../assets/teacher-1.jpg";
import teacher2 from "../assets/teacher-2.jpg";
import teacher3 from "../assets/teacher-9.jpg";
import teacher4 from "../assets/teacher-8.jpg";
import teacher5 from "../assets/teacher-10.jpg";
import teacher6 from "../assets/teacher-4.jpg";

const teachers = [
  {
    image: teacher1,
    name: "Dr. Neha Sharma",
    role: "Principal",
    subject: "Administration",
    experience: "15+ Years Experience",
    qualification: "M.Ed., Ph.D."
  },
  {
    image: teacher2,
    name: "Mr. Rahul Verma",
    role: "Senior Teacher",
    subject: "Physics",
    experience: "12+ Years Experience",
    qualification: "M.Sc., B.Ed."
  },
  {
    image: teacher3,
    name: "Ms. Priya Mehta",
    role: "English Teacher",
    subject: "English",
    experience: "10+ Years Experience",
    qualification: "M.A., B.Ed."
  },
  {
    image: teacher4,
    name: "Mr. Sandeep Rathore",
    role: "Mathematics Teacher",
    subject: "Mathematics",
    experience: "11+ Years Experience",
    qualification: "M.Sc., B.Ed."
  },
  {
    image: teacher5,
    name: "Ms. Anjali Kapoor",
    role: "Science Teacher",
    subject: "Biology",
    experience: "8+ Years Experience",
    qualification: "M.Sc., B.Ed."
  },
  {
    image: teacher6,
    name: "Mr. Amit Singh",
    role: "Sports Teacher",
    subject: "Physical Education",
    experience: "9+ Years Experience",
    qualification: "M.P.Ed."
  }
];

const stats = [
  {
    icon: <FaUsers />,
    number: "50+",
    text: "Expert Faculty Members"
  },
  {
    icon: <FaUserTie />,
    number: "80%",
    text: "Experienced Faculty"
  },
  {
    icon: <FaStar />,
    number: "100%",
    text: "Student Focused"
  },
  {
    icon: <FaLayerGroup />,
    number: "Multiple",
    text: "Subjects & Departments"
  }
];

const departments = [
  {
    icon: <FaBookOpen />,
    title: "Languages & Humanities",
    text: "English, Hindi, Social Science and other language-focused subjects."
  },
  {
    icon: <FaCalculator />,
    title: "Mathematics",
    text: "Building strong analytical, logical and problem-solving skills."
  },
  {
    icon: <FaFlask />,
    title: "Science",
    text: "Encouraging curiosity through Physics, Chemistry and Biology."
  },
  {
    icon: <FaLaptopCode />,
    title: "Computer & Technology",
    text: "Preparing students with digital skills for a changing world."
  },
  {
    icon: <FaPalette />,
    title: "Arts & Creative Learning",
    text: "Developing creativity through art, music and cultural activities."
  },
  {
    icon: <FaFutbol />,
    title: "Sports & Physical Education",
    text: "Promoting fitness, teamwork, discipline and sporting spirit."
  }
];

const values = [
  "Experienced and qualified educators",
  "Student-centred teaching approach",
  "Strong academic and personal mentorship",
  "Modern and engaging classroom practices",
  "Focus on values, confidence and leadership"
];

const Faculty = () => {
    const navigate = useNavigate();
  return (
    <>
      <Navbar />

      <main className="abfaculty-page">

        <section className="abfaculty-hero">
          <div className="abfaculty-hero-content">
            <span className="abfaculty-eyebrow">
              OUR FACULTY
            </span>

            <h1>Meet Our Faculty</h1>

            <p>
              Dedicated educators inspiring students to learn, grow
              and achieve their dreams.
            </p>
          </div>

          <div className="abfaculty-hero-icon">
            <FaChalkboardTeacher />
          </div>
        </section>

        <section className="abfaculty-stats">
          {stats.map((stat, index) => (
            <div className="abfaculty-stat" key={index}>
              <div className="abfaculty-stat-icon">
                {stat.icon}
              </div>

              <div className="abfaculty-stat-content">
                <strong>{stat.number}</strong>
                <span>{stat.text}</span>
              </div>
            </div>
          ))}
        </section>

        <section className="abfaculty-team">

          <div className="abfaculty-section-heading">
            <span>OUR TEACHERS</span>

            <h2>
              Meet Our Amazing Faculty
            </h2>

            <p>
              Our teachers are educators, mentors and guides who
              inspire every student to reach their potential.
            </p>
          </div>

          <div className="abfaculty-grid">
            {teachers.map((teacher, index) => (
              <article
                className="abfaculty-card"
                key={index}
              >
                <div className="abfaculty-image-box">
                  <img
                    src={teacher.image}
                    alt={teacher.name}
                  />

                  <div className="abfaculty-image-icon">
                    <FaGraduationCap />
                  </div>
                </div>

                <div className="abfaculty-card-content">

                  <h3>{teacher.name}</h3>

                  <span className="abfaculty-role">
                    {teacher.role}
                  </span>

                  <div className="abfaculty-info">

                    <p>
                      <FaBookOpen />

                      <span>
                        <b>Subject</b>
                        {teacher.subject}
                      </span>
                    </p>

                    <p>
                      <FaBriefcase />

                      <span>
                        <b>Experience</b>
                        {teacher.experience}
                      </span>
                    </p>

                    <p>
                      <FaAward />

                      <span>
                        <b>Qualification</b>
                        {teacher.qualification}
                      </span>
                    </p>

                  </div>

                  <div className="abfaculty-quote">
                    <FaQuoteLeft />

                    <p>
                      Passionate about creating meaningful
                      learning experiences for every student.
                    </p>
                  </div>

                </div>
              </article>
            ))}
          </div>

        </section>

        <section className="abfaculty-departments">

          <div className="abfaculty-section-heading">
            <span>OUR DEPARTMENTS</span>

            <h2>
              Learning Across Every Discipline
            </h2>

            <p>
              Our diverse academic departments provide students
              with opportunities to learn, explore and excel.
            </p>
          </div>

          <div className="abfaculty-department-grid">
            {departments.map((department, index) => (
              <div
                className="abfaculty-department-card"
                key={index}
              >
                <div className="abfaculty-department-icon">
                  {department.icon}
                </div>

                <div>
                  <h3>{department.title}</h3>

                  <p>
                    {department.text}
                  </p>

                  <span>
                    <FaCheckCircle />
                    Dedicated Faculty
                  </span>
                </div>
              </div>
            ))}
          </div>

        </section>

        <section className="abfaculty-why">

          <div className="abfaculty-why-image">
            <div className="abfaculty-why-icon">
              <FaChalkboardTeacher />
            </div>
          </div>

          <div className="abfaculty-why-content">

            <span>
              WHY OUR TEACHERS MATTER
            </span>

            <h2>
              Teachers Who Inspire Beyond the Classroom
            </h2>

            <p>
              At AB Public School, our teachers are more than
              educators. They are mentors, guides and role models
              who help students build knowledge, confidence and
              strong values for the future.
            </p>

            <div className="abfaculty-values">
              {values.map((value, index) => (
                <div
                  className="abfaculty-value"
                  key={index}
                >
                  <FaCheckCircle />
                  <span>{value}</span>
                </div>
              ))}
            </div>

          </div>

        </section>

        <section className="abfaculty-join">

          <div className="abfaculty-join-icon">
            <FaChalkboardTeacher />
          </div>

          <div className="abfaculty-join-content">

            <span>
              JOIN OUR TEAM
            </span>

            <h2>
              Grow With Us
            </h2>

            <p>
              Be part of a passionate team shaping confident
              and responsible future leaders.
            </p>
<button
  type="button"
  onClick={() => navigate("/careers")}
  className="abfaculty-join-btn"
>
  Explore Career Opportunities
  <FaArrowRight />
</button>
          </div>

          <div className="abfaculty-join-decoration">
            <FaGraduationCap />
            <FaBookOpen />
            <FaAward />
          </div>

        </section>

      </main>

      <Footer />
    </>
  );
};

export default Faculty;