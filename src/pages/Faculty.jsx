import React from "react";
import { useNavigate } from "react-router-dom";

import {
  FaArrowRight,
  FaArrowLeft,
  FaUsers,
  FaBookOpen,
  FaTrophy,
  FaChartLine,
  FaGraduationCap,
  FaHeart,
  FaLightbulb,
  FaUserGraduate,
  FaHandsHelping,
  FaMedal,
  FaLinkedinIn,
  FaInstagram,
  FaEnvelope,
  FaChild,
  FaSchool,
  FaFlask,
  FaPalette,
  FaQuoteLeft,
  FaShieldAlt,
  FaStar,
  FaPlay,
} from "react-icons/fa";

import "./Faculty.css";

/* =========================
   IMAGES
========================= */

import facultyHero from "../assets/faculty-hero.jpg";
import facultyLearning from "../assets/faculty-learning.jpg";
import schoolBuilding from "../assets/school-building.jpg";

import teacher1 from "../assets/teacher-1.jpg";
import teacher2 from "../assets/teacher-2.jpg";
import teacher3 from "../assets/teacher-9.jpg";
import teacher4 from "../assets/teacher-8.jpg";
import teacher5 from "../assets/teacher-10.jpg";
import teacher6 from "../assets/teacher-4.jpg";

/* Department images - change names according to your assets */
import prePrimaryImg from "../assets/pre-primary.jpg";
import primaryImg from "../assets/primary-student.jpg";
import middleImg from "../assets/middle-student.jpg";
import secondaryImg from "../assets/secondary-student.jpg";
import seniorImg from "../assets/senior-secondary-student.jpg";
import activityImg from "../assets/co-curricular.jpg";

/* =========================
   DATA
========================= */

const facultyMembers = [
  {
    id: 1,
    name: "Dr. Amit Sharma",
    role: "Head – Computer Science",
    image: teacher1,
    degree: "Ph.D. (IIT Delhi)",
    experience: "8+ Years Experience",
    expertise: "AI & Machine Learning",
  },
  {
    id: 2,
    name: "Prof. Neha Verma",
    role: "Head – Electronics",
    image: teacher2,
    degree: "M.Tech (NIT Trichy)",
    experience: "7+ Years Experience",
    expertise: "Embedded Systems",
  },
  {
    id: 3,
    name: "Mr. Rajesh Kumar",
    role: "Mathematics Faculty",
    image: teacher3,
    degree: "M.Sc. Mathematics",
    experience: "10+ Years Experience",
    expertise: "Academic Excellence",
  },
  {
    id: 4,
    name: "Ms. Priya Singh",
    role: "English Faculty",
    image: teacher4,
    degree: "M.A. English",
    experience: "6+ Years Experience",
    expertise: "Language & Literature",
  },
  {
    id: 5,
    name: "Mr. Vikram Singh",
    role: "Sports Coordinator",
    image: teacher5,
    degree: "B.P.Ed",
    experience: "8+ Years Experience",
    expertise: "Sports Development",
  },
  {
    id: 6,
    name: "Ms. Kavita Rao",
    role: "Science Faculty",
    image: teacher6,
    degree: "M.Sc. Chemistry",
    experience: "9+ Years Experience",
    expertise: "Research & Innovation",
  },
];

const stats = [
  {
    icon: <FaUsers />,
    number: "100+",
    text: "Expert Teachers",
  },
  {
    icon: <FaBookOpen />,
    number: "15+",
    text: "Departments",
  },
  {
    icon: <FaTrophy />,
    number: "25+",
    text: "Years of Excellence",
  },
  {
    icon: <FaChartLine />,
    number: "98%",
    text: "Board Results",
  },
  {
    icon: <FaGraduationCap />,
    number: "1500+",
    text: "Happy Students",
  },
];

const heroFeatures = [
  {
    icon: <FaBookOpen />,
    title: "Expertise",
    text: "in Every Subject",
  },
  {
    icon: <FaUserGraduate />,
    title: "Student-First",
    text: "Approach",
  },
  {
    icon: <FaLightbulb />,
    title: "Modern",
    text: "Teaching Methods",
  },
  {
    icon: <FaHeart />,
    title: "Care &",
    text: "Empathy",
  },
  {
    icon: <FaMedal />,
    title: "Lifelong",
    text: "Guidance",
  },
];

const teacherValues = [
  {
    icon: <FaUserGraduate />,
    title: "Personalized Attention",
    text: "Understanding every learner",
  },
  {
    icon: <FaLightbulb />,
    title: "Innovative Teaching",
    text: "Engaging & modern learning methods",
  },
  {
    icon: <FaHandsHelping />,
    title: "Mentorship",
    text: "Guiding beyond textbooks",
  },
  {
    icon: <FaHeart />,
    title: "Holistic Development",
    text: "Academics, values & life skills",
  },
];

const departments = [
  {
    icon: <FaChild />,
    title: "Pre-Primary",
    text: "Nurturing young minds",
    image: prePrimaryImg,
    className: "pink",
  },
  {
    icon: <FaBookOpen />,
    title: "Primary",
    text: "Strong foundations",
    image: primaryImg,
    className: "yellow",
  },
  {
    icon: <FaSchool />,
    title: "Middle School",
    text: "Encouraging curiosity",
    image: middleImg,
    className: "blue",
  },
  {
    icon: <FaFlask />,
    title: "Secondary",
    text: "Academic excellence",
    image: secondaryImg,
    className: "green",
  },
  {
    icon: <FaGraduationCap />,
    title: "Senior Secondary",
    text: "Career preparation",
    image: seniorImg,
    className: "purple",
  },
  {
    icon: <FaPalette />,
    title: "Co-Curricular",
    text: "Beyond academics",
    image: activityImg,
    className: "coral",
  },
];

const testimonials = [
  {
    image: teacher3,
    text: "Our teachers make learning interesting and always encourage us to do our best.",
    name: "Aarav Sharma",
    className: "Class X",
  },
  {
    image: teacher4,
    text: "I feel supported and motivated in every subject. My teachers believe in me.",
    name: "Riya Mehta",
    className: "Class IX",
  },
  {
    image: teacher5,
    text: "Teachers here are not only knowledgeable but also kind and helpful. They inspire us every day.",
    name: "Kunal Verma",
    className: "Class VIII",
  },
];

/* =========================
   COMPONENT
========================= */

const Faculty = () => {
  const navigate = useNavigate();

  const goApply = () => {
    navigate("/apply");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <main className="facultyPremiumPage">

      {/* =====================================
          HERO
      ====================================== */}

      <section className="facultyPremiumHero">

        <div className="facultyHeroGlow facultyHeroGlowOne"></div>
        <div className="facultyHeroGlow facultyHeroGlowTwo"></div>

        <div className="facultyHeroMain">

          {/* LEFT CONTENT */}
          <div className="facultyHeroContent">

            <div className="facultySmallLabel">
              <span>OUR FACULTY</span>
              <i></i>
            </div>

            <h1>
              Guiding Minds.
              <span>Inspiring Futures.</span>
            </h1>

            <p className="facultyHeroDescription">
              At AB Public School, our faculty is more than a team of
              teachers — they are mentors, innovators and lifelong learners
              who inspire students to discover, learn and achieve their best.
            </p>

            <div className="facultyHeroButtons">
              <button
                className="facultyPrimaryBtn"
                onClick={() => {
                  document
                    .getElementById("facultyTeam")
                    ?.scrollIntoView({ behavior: "smooth" });
                }}
              >
                Meet Our Faculty
                <FaArrowRight />
              </button>

              <button
                className="facultyOutlineBtn"
                onClick={() => {
                  document
                    .getElementById("teachingPhilosophy")
                    ?.scrollIntoView({ behavior: "smooth" });
                }}
              >
                Our Teaching Philosophy

                <span>
                  <FaPlay />
                </span>
              </button>
            </div>

            {/* FEATURES */}

            <div className="facultyHeroFeatures">
              {heroFeatures.map((item, index) => (
                <div className="facultyHeroFeature" key={index}>
                  <div className="facultyFeatureIcon">
                    {item.icon}
                  </div>

                  <strong>{item.title}</strong>
                  <small>{item.text}</small>
                </div>
              ))}
            </div>
          </div>

          {/* RIGHT IMAGE */}

          <div className="facultyHeroVisual">

            <div className="facultyHeroQuote">
              <span>“</span>
              Teachers
              <br />
              make the world
              <br />
              a brighter place.
            </div>

            <img
              src={facultyHero}
              alt="Teacher guiding students"
            />

            <div className="facultyHeroSidePanel">

              <div className="facultySideWords">
                <span>EDUCATE</span>
                <span>MOTIVATE</span>
                <span>EMPOWER</span>
              </div>

              <div className="facultySideLine"></div>

              <p>
                A STRONGER
                <br />
                TOMORROW
                <br />
                WITH GREAT
                <br />
                TEACHERS
              </p>

              <FaBookOpen className="facultySideBook" />
            </div>

            <div className="facultyCoralShape">
              Great
              <br />
              Teachers
              <br />
              Create
              <br />
              Great Lives.
            </div>
          </div>
        </div>

        {/* STATS */}

        <div className="facultyStatsBar">
          {stats.map((item, index) => (
            <div className="facultyStatItem" key={index}>

              <div className="facultyStatIcon">
                {item.icon}
              </div>

              <div>
                <strong>{item.number}</strong>
                <span>{item.text}</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* =====================================
          WHY TEACHERS MATTER
      ====================================== */}

      <section
        className="facultyWhySection"
        id="teachingPhilosophy"
      >

        <div className="facultyWhyImage">

          <img
            src={facultyLearning}
            alt="Teacher teaching students"
          />

          <div className="facultyWhyImageBadge">
            Teaching
            <br />
            Today for a
            <br />
            Brighter
            <br />
            Tomorrow.
          </div>
        </div>

        <div className="facultyWhyContent">

          <div className="facultySmallLabel">
            <span>WHY OUR TEACHERS MATTER</span>
            <i></i>
          </div>

          <h2>More Than Just Educators.</h2>

          <p>
            Our teachers are mentors, role models and lifelong learners
            who create a nurturing environment where every student feels
            valued, challenged and inspired.
          </p>

          <div className="facultyValuesGrid">

            {teacherValues.map((item, index) => (
              <div className="facultyValueItem" key={index}>

                <div className="facultyValueIcon">
                  {item.icon}
                </div>

                <strong>{item.title}</strong>

                <span>{item.text}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="facultyWhyQuote">
          <FaQuoteLeft />

          <blockquote>
            A good teacher can inspire hope, ignite imagination and
            instill a love for learning.
          </blockquote>

          <span>— Brad Henry</span>
        </div>
      </section>

      {/* =====================================
          FACULTY TEAM
      ====================================== */}

      <section
        className="facultyTeamSection"
        id="facultyTeam"
      >

        <div className="facultySectionHeader">

          <div>
            <div className="facultySmallLabel lightLabel">
              <span>MEET OUR FACULTY</span>
              <i></i>
            </div>

            <h2>
              Dedicated Professionals.
              <span> Remarkable Impact.</span>
            </h2>
          </div>

        
        </div>

        <div className="facultyCardsGrid">

          {facultyMembers.map((teacher) => (
            <article
              className="facultyTeacherCard"
              key={teacher.id}
            >

              <div className="facultyTeacherImage">
                <img
                  src={teacher.image}
                  alt={teacher.name}
                />
              </div>

              <div className="facultyTeacherInfo">

                <h3>{teacher.name}</h3>

                <p className="facultyTeacherRole">
                  {teacher.role}
                </p>

                <ul>
                  <li>
                    <FaGraduationCap />
                    {teacher.degree}
                  </li>

                  <li>
                    <FaUserGraduate />
                    {teacher.experience}
                  </li>

                  <li>
                    <FaBookOpen />
                    {teacher.expertise}
                  </li>
                </ul>

                
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* =====================================
          DEPARTMENTS
      ====================================== */}

      <section className="facultyDepartments">

        <div className="facultyDepartmentHeader">

          <div>
            <span className="facultyDepartmentLabel">
              OUR FACULTY DEPARTMENTS
            </span>

            <h2>
              Excellence Across Every Subject
            </h2>
          </div>

       
        </div>

        <div className="facultyDepartmentGrid">

          {departments.map((department, index) => (
            <article
              className={`facultyDepartmentCard ${department.className}`}
              key={index}
            >

              <div className="facultyDepartmentImage">
                <img
                  src={department.image}
                  alt={department.title}
                />
              </div>

              <div className="facultyDepartmentIcon">
                {department.icon}
              </div>

              <h3>{department.title}</h3>

              <p>{department.text}</p>
            </article>
          ))}

          <div className="facultyDepartmentVisual">

            <img
              src={facultyLearning}
              alt="Learning"
            />

            <div>
              Different
              <br />
              Subjects.
              <br />
              Same Passion.
            </div>
          </div>
        </div>
      </section>

      {/* =====================================
          TESTIMONIALS
      ====================================== */}

      <section className="facultyTestimonials">

        <div className="facultyTestimonialHeading">

          <span>VOICES FROM OUR STUDENTS</span>

          <h2>
            Real Stories.
            <br />
            True Inspiration.
          </h2>
        </div>

        <div className="facultyTestimonialsGrid">

          {testimonials.map((item, index) => (
            <article
              className="facultyTestimonialCard"
              key={index}
            >

              <div className="facultyStudentImage">
                <img
                  src={item.image}
                  alt={item.name}
                />
              </div>

              <div>
                <FaQuoteLeft className="facultyQuoteIcon" />

                <p>“{item.text}”</p>

                <strong>{item.name}</strong>
                <span>{item.className}</span>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* =====================================
          FINAL CTA
      ====================================== */}

      <section className="facultyBottomCta">

        <div
          className="facultyBottomBackground"
          style={{
            backgroundImage: `url(${schoolBuilding})`,
          }}
        ></div>

        <div className="facultyBottomOverlay"></div>

        <div className="facultyBottomDecoration one"></div>
        <div className="facultyBottomDecoration two"></div>

        <div className="facultyBottomFeatures">

          <div>
            <FaLightbulb />
            <span>
              Stronger
              <br />
              Students
            </span>
          </div>

          <div>
            <FaStar />
            <span>
              Brighter
              <br />
              Communities
            </span>
          </div>

          <div>
            <FaShieldAlt />
            <span>
              Better
              <br />
              Tomorrows
            </span>
          </div>
        </div>

        <div className="facultyBottomContent">

          <h2>
            Be Part of a Community
            <br />
            That Values Education.
          </h2>

          <p>
            Together, our faculty and students create a brighter,
            kinder and more innovative future.
          </p>

          <button onClick={goApply}>
            Join Our School
            <FaArrowRight />
          </button>
        </div>

        <div className="facultyBottomQuote">
          <FaQuoteLeft />

          <p>
            Teachers
            <br />
            Change
            <br />
            the World.
          </p>

          <div>
            INSPIRE
            <span>|</span>
            EDUCATE
            <span>|</span>
            EMPOWER
          </div>
        </div>
      </section>
    </main>
  );
};

export default Faculty;