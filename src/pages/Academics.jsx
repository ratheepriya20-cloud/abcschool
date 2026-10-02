import React from "react";
import { useNavigate } from "react-router-dom";

import {
  FaArrowRight,
  FaPhoneAlt,
  FaCheck,
  FaBookOpen,
  FaCalculator,
  FaFlask,
  FaLaptopCode,
  FaLanguage,
  FaPalette,
  FaUsers,
  FaLightbulb,
  FaGraduationCap,
  FaChartLine,
  FaAward,
  FaCompass,
  FaBrain,
  FaStar,
  FaQuoteLeft,
  FaRunning,
  FaGlobeAsia,
  FaChalkboardTeacher,
  FaRocket,
  FaPenNib,
  FaProjectDiagram,
  FaComments,
  FaBullseye,
} from "react-icons/fa";

import "./Academics.css";

/* =========================================================
   IMAGES
========================================================= */

import heroStudent from "../assets/academic-hero-student.jpg";
import schoolGate from "../assets/school-gate.jpg";

import primaryStudent from "../assets/primary-student.jpg";
import middleStudent from "../assets/middle-student.jpg";
import secondaryStudent from "../assets/secondary-student.jpg";
import seniorStudent from "../assets/senior-secondary-student.jpg";

/* SUBJECT IMAGES */

import languageImage from "../assets/language-learning.jpg";
import mathematicsImage from "../assets/mathematics-learning.jpg";
import scienceImage from "../assets/science-learning.jpg";
import socialScienceImage from "../assets/social-science-learning.jpg";
import technologyImage from "../assets/technology-learning.jpg";
import creativeImage from "../assets/creative-learning.jpg";

/* OTHER */

import campusStudents from "../assets/campus-students.jpg";


const Academics = () => {
  const navigate = useNavigate();

  /* =======================================================
     CHANGE SCHOOL NUMBER
  ======================================================= */

  const SCHOOL_PHONE = "+919876543210";

  const callSchool = () => {
    window.location.href = `tel:${SCHOOL_PHONE}`;
  };


  /* =======================================================
     LEARNING APPROACH
  ======================================================= */

  const learningSteps = [
    {
      number: "01",
      icon: <FaBrain />,
      title: "Understand",
      tag: "BUILD THE FOUNDATION",
      text:
        "Clear explanations and meaningful discussions help students understand ideas before moving towards application.",
    },
    {
      number: "02",
      icon: <FaCompass />,
      title: "Explore",
      tag: "QUESTION & DISCOVER",
      text:
        "Students investigate, ask questions and discover connections through active classroom experiences.",
    },
    {
      number: "03",
      icon: <FaLightbulb />,
      title: "Apply",
      tag: "TURN IDEAS INTO SKILLS",
      text:
        "Projects, activities and problem-solving encourage learners to use knowledge in meaningful situations.",
    },
    {
      number: "04",
      icon: <FaAward />,
      title: "Grow",
      tag: "REFLECT & IMPROVE",
      text:
        "Practice, reflection and constructive feedback help every student move forward with confidence.",
    },
  ];


  /* =======================================================
     ACADEMIC STAGES
  ======================================================= */

  const stages = [
    {
      number: "01",
      label: "FOUNDATION",
      title: "Primary School",
      classes: "CLASSES I – V",
      image: primaryStudent,
      text:
        "Building strong foundations in language, numeracy, curiosity and confident communication.",
      points: [
        "Language Development",
        "Numeracy Skills",
        "Activity-Based Learning",
      ],
    },

    {
      number: "02",
      label: "DISCOVERY",
      title: "Middle School",
      classes: "CLASSES VI – VIII",
      image: middleStudent,
      text:
        "Encouraging deeper exploration, independent thinking and meaningful connections across subjects.",
      points: [
        "Concept Development",
        "Projects & Presentations",
        "Scientific Thinking",
      ],
    },

    {
      number: "03",
      label: "MASTERY",
      title: "Secondary School",
      classes: "CLASSES IX – X",
      image: secondaryStudent,
      text:
        "Developing disciplined learning, strong subject understanding and confident problem-solving.",
      points: [
        "Subject Mastery",
        "Structured Practice",
        "Academic Guidance",
      ],
    },

    {
      number: "04",
      label: "FUTURE",
      title: "Senior Secondary",
      classes: "CLASSES XI – XII",
      image: seniorStudent,
      text:
        "Supporting advanced learning, academic independence and preparation for future opportunities.",
      points: [
        "Advanced Academics",
        "Career Awareness",
        "Future Readiness",
      ],
    },
  ];


  /* =======================================================
     SUBJECTS
  ======================================================= */

  const subjects = [
    {
      number: "01",
      icon: <FaLanguage />,
      title: "Languages",
      tag: "COMMUNICATE",
      image: languageImage,
      text:
        "Language learning develops reading, writing, expression and confident communication.",
      mini: "READ • WRITE • EXPRESS",
    },

    {
      number: "02",
      icon: <FaCalculator />,
      title: "Mathematics",
      tag: "THINK",
      image: mathematicsImage,
      text:
        "Logical reasoning and problem-solving build confidence with numbers, patterns and ideas.",
      mini: "REASON • SOLVE • APPLY",
    },

    {
      number: "03",
      icon: <FaFlask />,
      title: "Science",
      tag: "DISCOVER",
      image: scienceImage,
      text:
        "Observation and investigation encourage students to understand how the world works.",
      mini: "EXPLORE • TEST • DISCOVER",
    },

    {
      number: "04",
      icon: <FaGlobeAsia />,
      title: "Social Science",
      tag: "UNDERSTAND",
      image: socialScienceImage,
      text:
        "Students explore people, places, history and society to understand the world around them.",
      mini: "PEOPLE • PLACES • SOCIETY",
    },

    {
      number: "05",
      icon: <FaLaptopCode />,
      title: "Technology",
      tag: "CREATE",
      image: technologyImage,
      text:
        "Digital learning encourages logical thinking, creativity and confidence with modern technology.",
      mini: "THINK • CODE • BUILD",
    },

    {
      number: "06",
      icon: <FaPalette />,
      title: "Creative Learning",
      tag: "IMAGINE",
      image: creativeImage,
      text:
        "Art and creative experiences encourage imagination, originality and personal expression.",
      mini: "IMAGINE • DESIGN • EXPRESS",
    },
  ];


  /* =======================================================
     DEVELOPMENT AREAS
  ======================================================= */

  const developmentAreas = [
    {
      number: "01",
      icon: <FaBookOpen />,
      title: "Academic Understanding",
      text:
        "Clear concepts and meaningful practice create a strong academic foundation.",
    },

    {
      number: "02",
      icon: <FaComments />,
      title: "Communication",
      text:
        "Students learn to express ideas clearly through discussion, writing and presentation.",
    },

    {
      number: "03",
      icon: <FaBrain />,
      title: "Critical Thinking",
      text:
        "Questions and problem-solving encourage students to analyse, reason and make connections.",
    },

    {
      number: "04",
      icon: <FaBullseye />,
      title: "Personal Progress",
      text:
        "Feedback and reflection help learners recognise progress and identify their next step.",
    },
  ];


  /* =======================================================
     BEYOND CLASSROOM
  ======================================================= */

  const beyondItems = [
    {
      number: "01",
      icon: <FaRunning />,
      title: "Sports & Fitness",
      text:
        "Physical activity encourages discipline, teamwork, resilience and healthy habits.",
    },

    {
      number: "02",
      icon: <FaPalette />,
      title: "Arts & Creativity",
      text:
        "Creative experiences give students space to imagine, create and express themselves.",
    },

    {
      number: "03",
      icon: <FaUsers />,
      title: "Teamwork",
      text:
        "Group experiences strengthen collaboration, responsibility and communication.",
    },

    {
      number: "04",
      icon: <FaAward />,
      title: "Competitions",
      text:
        "Challenges encourage students to participate confidently and keep improving.",
    },
  ];


  return (
    <main className="novaAcadPage">

      {/* =====================================================
          HERO
      ===================================================== */}

      <section className="novaAcadHero">

        <div className="novaAcadHeroPattern"></div>

        <div className="novaAcadHeroOrb novaAcadOrbOne"></div>
        <div className="novaAcadHeroOrb novaAcadOrbTwo"></div>

        <div className="novaAcadContainer novaAcadHeroLayout">

          {/* LEFT */}

          <div className="novaAcadHeroContent">

            <div className="novaAcadHeroLabel">
              <span className="novaAcadLabelLine"></span>

              <span className="novaAcadLabelIcon">
                <FaGraduationCap />
              </span>

              <strong>
                AB PUBLIC SCHOOL • ACADEMICS
              </strong>
            </div>


            <h1>
              Learning That
              <span>Builds Confidence.</span>
              Futures That Inspire.
            </h1>


            <p>
              A thoughtful academic journey that combines strong
              foundations, meaningful learning, creativity and
              future-ready skills for every student.
            </p>


            <div className="novaAcadHeroActions">

              <button
                className="novaAcadApplyBtn"
                onClick={() => navigate("/apply")}
              >
                Apply for Admission

                <span>
                  <FaArrowRight />
                </span>
              </button>


              <button
                className="novaAcadTalkBtn"
                onClick={callSchool}
              >
                <span className="novaAcadTalkIcon">
                  <FaPhoneAlt />
                </span>

                <span className="novaAcadTalkText">
                  <small>ADMISSION SUPPORT</small>
                  <strong>Talk to Our Team</strong>
                </span>
              </button>

            </div>


            <div className="novaAcadHeroChecks">

              <span>
                <FaCheck />
                Concept-Based Learning
              </span>

              <span>
                <FaCheck />
                Personal Growth
              </span>

              <span>
                <FaCheck />
                Future-Ready Skills
              </span>

            </div>

          </div>


          {/* RIGHT */}

          <div className="novaAcadHeroVisual">

            <div className="novaAcadHeroGoldShape"></div>
            <div className="novaAcadHeroSkyShape"></div>


            <div className="novaAcadHeroImageBox">

              <img
                src={heroStudent}
                alt="Student learning at AB Public School"
              />

              <div className="novaAcadHeroImageOverlay"></div>


              <div className="novaAcadImageTitle">

                <small>
                  ACADEMIC EXCELLENCE
                </small>

                <strong>
                  Learn With
                  <span>Purpose.</span>
                </strong>

              </div>

            </div>


            <div className="novaAcadHeroBadge">

              <div>
                <FaStar />
              </div>

              <span>
                BUILDING
              </span>

              <strong>
                BRIGHTER
              </strong>

              <small>
                FUTURES
              </small>

            </div>


            <div className="novaAcadFloatCard novaAcadFloatOne">

              <span>
                01
              </span>

              <div>
                <small>OUR FOCUS</small>
                <strong>Strong Foundations</strong>
              </div>

            </div>


            <div className="novaAcadFloatCard novaAcadFloatTwo">

              <span>
                <FaRocket />
              </span>

              <div>
                <small>OUR DIRECTION</small>
                <strong>Future Ready</strong>
              </div>

            </div>

          </div>

        </div>


        {/* HERO BOTTOM BAR */}

        <div className="novaAcadContainer">

          <div className="novaAcadHeroBar">

            <div>
              <span>01</span>

              <div>
                <strong>Understand</strong>
                <small>Build clear concepts</small>
              </div>
            </div>


            <div>
              <span>02</span>

              <div>
                <strong>Explore</strong>
                <small>Discover new ideas</small>
              </div>
            </div>


            <div>
              <span>03</span>

              <div>
                <strong>Apply</strong>
                <small>Turn knowledge into skills</small>
              </div>
            </div>


            <div>
              <span>04</span>

              <div>
                <strong>Grow</strong>
                <small>Move forward confidently</small>
              </div>
            </div>

          </div>

        </div>

      </section>


      {/* =====================================================
          PHILOSOPHY
      ===================================================== */}

      <section className="novaAcadPhilosophy">

        <div className="novaAcadContainer">

          <div className="novaAcadHeading">

            <div className="novaAcadSectionLabel">
              <span>01</span>
              OUR ACADEMIC PHILOSOPHY
            </div>

            <h2>
              Education With
              <em> Purpose.</em>
            </h2>

            <p>
              We create meaningful learning experiences that strengthen
              knowledge, curiosity, confidence and character.
            </p>

          </div>


          <div className="novaAcadPhilosophyLayout">

            <div className="novaAcadPhilosophyImage">

              <img
                src={schoolGate}
                alt="AB Public School campus"
              />

              <span className="novaAcadImageIndex">
                01
              </span>


              <div className="novaAcadImageCaption">

                <small>
                  A PLACE TO LEARN
                </small>

                <strong>
                  Growing Minds.
                  <br />
                  Building Character.
                </strong>

              </div>

            </div>


            <div className="novaAcadPhilosophyContent">

              <span className="novaAcadMiniTitle">
                OUR BELIEF
              </span>

              <h3>
                Every Child Deserves
                <span>
                  Meaningful Learning.
                </span>
              </h3>

              <p>
                Learning becomes powerful when students understand
                concepts, ask meaningful questions and confidently use
                what they have learned.
              </p>


              <div className="novaAcadPhilosophyPoints">

                <div>
                  <span>
                    <FaBrain />
                  </span>

                  <div>
                    <strong>Think Clearly</strong>
                    <p>
                      Understand concepts and make meaningful connections.
                    </p>
                  </div>
                </div>


                <div>
                  <span>
                    <FaLightbulb />
                  </span>

                  <div>
                    <strong>Explore Freely</strong>
                    <p>
                      Ask questions and discover ideas through experience.
                    </p>
                  </div>
                </div>


                <div>
                  <span>
                    <FaRocket />
                  </span>

                  <div>
                    <strong>Move Forward</strong>
                    <p>
                      Develop confidence and skills for future learning.
                    </p>
                  </div>
                </div>

              </div>

            </div>


            <div className="novaAcadQuote">

              <FaQuoteLeft />

              <p>
                Education is not only about what students
                <strong> know.</strong>
                It is also about who they
                <strong> become.</strong>
              </p>

              <span></span>

              <small>
                AB PUBLIC SCHOOL
              </small>

            </div>

          </div>

        </div>

      </section>


      {/* =====================================================
          HOW WE LEARN
      ===================================================== */}

      <section className="novaAcadMethod">

        <div className="novaAcadContainer">

          <div className="novaAcadHeading">

            <div className="novaAcadSectionLabel">
              <span>02</span>
              HOW STUDENTS LEARN
            </div>

            <h2>
              Learning That
              <em> Moves Forward.</em>
            </h2>

            <p>
              A simple and purposeful learning process helps students
              progress from understanding ideas to using them confidently.
            </p>

          </div>


          <div className="novaAcadMethodGrid">

            {learningSteps.map((step, index) => (

              <article
                className="novaAcadMethodCard"
                key={index}
              >

                <div className="novaAcadMethodTop">

                  <span className="novaAcadMethodNumber">
                    {step.number}
                  </span>

                  <span className="novaAcadMethodIcon">
                    {step.icon}
                  </span>

                </div>


                <small>
                  {step.tag}
                </small>

                <h3>
                  {step.title}
                </h3>

                <p>
                  {step.text}
                </p>


                <div className="novaAcadMethodBottom">

                  <span></span>

                  <FaArrowRight />

                </div>

              </article>

            ))}

          </div>

        </div>

      </section>


      {/* =====================================================
          ACADEMIC STAGES
      ===================================================== */}

      <section className="novaAcadStages">

        <div className="novaAcadContainer">

          <div className="novaAcadHeading">

            <div className="novaAcadSectionLabel">
              <span>03</span>
              ACADEMIC JOURNEY
            </div>

            <h2>
              Growing Through
              <em> Every Stage.</em>
            </h2>

            <p>
              Each academic stage supports students with the right
              balance of guidance, challenge and independence.
            </p>

          </div>


          <div className="novaAcadStageGrid">

            {stages.map((stage, index) => (

              <article
                className="novaAcadStageCard"
                key={index}
              >

                <div className="novaAcadStageImage">

                  <img
                    src={stage.image}
                    alt={stage.title}
                  />

                  <div className="novaAcadStageOverlay"></div>


                  <span className="novaAcadStageNo">
                    {stage.number}
                  </span>


                  <span className="novaAcadStageLabel">
                    {stage.label}
                  </span>

                </div>


                <div className="novaAcadStageBody">

                  <span className="novaAcadStageClass">
                    {stage.classes}
                  </span>

                  <h3>
                    {stage.title}
                  </h3>

                  <p>
                    {stage.text}
                  </p>


                  <div className="novaAcadStagePoints">

                    {stage.points.map((point, pointIndex) => (

                      <span key={pointIndex}>
                        <FaCheck />
                        {point}
                      </span>

                    ))}

                  </div>

                </div>

              </article>

            ))}

          </div>

        </div>

      </section>


      {/* =====================================================
          NEW PREMIUM SUBJECTS
      ===================================================== */}

      <section className="novaAcadSubjects">

        <div className="novaAcadSubjectPattern"></div>

        <div className="novaAcadContainer">

          <div className="novaAcadSubjectsHeader">

            <div className="novaAcadHeading">

              <div className="novaAcadSectionLabel">
                <span>04</span>
                OUR LEARNING WORLD
              </div>

              <h2>
                Subjects That Open
                <em> New Possibilities.</em>
              </h2>

              <p>
                A balanced learning experience connects communication,
                logic, discovery, technology, society and creativity.
              </p>

            </div>


            <div className="novaAcadSubjectHeaderBadge">

              <FaBookOpen />

              <span>
                LEARN
              </span>

              <strong>
                BEYOND
              </strong>

              <small>
                BOUNDARIES
              </small>

            </div>

          </div>


          <div className="novaAcadSubjectGrid">

            {subjects.map((subject, index) => (

              <article
                className="novaAcadSubjectCard"
                key={index}
              >

                {/* IMAGE */}

                <div className="novaAcadSubjectImage">

                  <img
                    src={subject.image}
                    alt={subject.title}
                  />

                  <div className="novaAcadSubjectOverlay"></div>


                  <span className="novaAcadSubjectNo">
                    {subject.number}
                  </span>


                  <span className="novaAcadSubjectIcon">
                    {subject.icon}
                  </span>


                  <div className="novaAcadSubjectImageTitle">

                    <small>
                      {subject.tag}
                    </small>

                    <h3>
                      {subject.title}
                    </h3>

                  </div>

                </div>


                {/* CONTENT */}

                <div className="novaAcadSubjectContent">

                  <span className="novaAcadSubjectMini">
                    {subject.mini}
                  </span>

                  <p>
                    {subject.text}
                  </p>


                  <div className="novaAcadSubjectFooter">

                    <span></span>

                    <div>
                      <FaArrowRight />
                    </div>

                  </div>

                </div>

              </article>

            ))}

          </div>

        </div>

      </section>


      {/* =====================================================
          NEW DEVELOPMENT SECTION
      ===================================================== */}

      <section className="novaAcadDevelopment">

        <div className="novaAcadContainer">

          <div className="novaAcadDevelopmentShell">

            {/* LEFT */}

            <div className="novaAcadDevelopmentIntro">

              <div className="novaAcadSectionLabel novaAcadLightLabel">
                <span>05</span>
                HOW GROWTH HAPPENS
              </div>

              <h2>
                Learning Is More
                <em>
                  Than A Score.
                </em>
              </h2>

              <p>
                Student progress is supported through understanding,
                practice, communication, feedback and reflection.
              </p>


              <div className="novaAcadDevelopmentQuote">

                <FaQuoteLeft />

                <p>
                  Progress becomes meaningful when students understand
                  where they are, what they have learned and what they
                  can improve next.
                </p>

              </div>

            </div>


            {/* RIGHT */}

            <div className="novaAcadDevelopmentBoard">

              <div className="novaAcadDevelopmentTop">

                <div>
                  <small>
                    STUDENT DEVELOPMENT
                  </small>

                  <strong>
                    Four Dimensions of Growth
                  </strong>
                </div>

                <span>
                  <FaChartLine />
                </span>

              </div>


              <div className="novaAcadDevelopmentGrid">

                {developmentAreas.map((item, index) => (

                  <article
                    className="novaAcadDevelopmentCard"
                    key={index}
                  >

                    <span className="novaAcadDevelopmentNo">
                      {item.number}
                    </span>


                    <span className="novaAcadDevelopmentIcon">
                      {item.icon}
                    </span>


                    <h3>
                      {item.title}
                    </h3>

                    <p>
                      {item.text}
                    </p>

                  </article>

                ))}

              </div>


              <div className="novaAcadProgressFlow">

                <span>
                  LEARN
                </span>

                <FaArrowRight />

                <span>
                  PRACTISE
                </span>

                <FaArrowRight />

                <span>
                  REFLECT
                </span>

                <FaArrowRight />

                <span>
                  IMPROVE
                </span>

              </div>

            </div>

          </div>

        </div>

      </section>


      {/* =====================================================
          BEYOND CLASSROOM - REDESIGNED
      ===================================================== */}

      <section className="novaAcadBeyond">

        <div className="novaAcadContainer">

          <div className="novaAcadHeading">

            <div className="novaAcadSectionLabel">
              <span>06</span>
              BEYOND ACADEMICS
            </div>

            <h2>
              Building The
              <em> Whole Student.</em>
            </h2>

            <p>
              Learning beyond textbooks helps students develop
              confidence, creativity, teamwork and responsibility.
            </p>

          </div>


          <div className="novaAcadBeyondShell">

            {/* LEFT FEATURE */}

            <div className="novaAcadBeyondFeature">

              <div className="novaAcadBeyondFeatureTop">

                <span>
                  360°
                </span>

                <small>
                  HOLISTIC
                  <br />
                  DEVELOPMENT
                </small>

              </div>


              <div className="novaAcadBeyondFeatureIcon">
                <FaGraduationCap />
              </div>


              <h3>
                Knowledge.
                <span>
                  Character.
                </span>
                Confidence.
              </h3>


              <p>
                We believe meaningful education supports both academic
                learning and personal development.
              </p>


              <button
                onClick={() => navigate("/activities")}
              >
                Explore Student Life
                <FaArrowRight />
              </button>

            </div>


            {/* RIGHT GRID */}

            <div className="novaAcadBeyondGrid">

              {beyondItems.map((item, index) => (

                <article
                  className="novaAcadBeyondCard"
                  key={index}
                >

                  <span className="novaAcadBeyondNumber">
                    {item.number}
                  </span>


                  <div className="novaAcadBeyondCardIcon">
                    {item.icon}
                  </div>


                  <h3>
                    {item.title}
                  </h3>

                  <p>
                    {item.text}
                  </p>


                  <span className="novaAcadBeyondArrow">
                    <FaArrowRight />
                  </span>

                </article>

              ))}

            </div>

          </div>

        </div>

      </section>


      {/* =====================================================
          FINAL CTA
      ===================================================== */}

      <section className="novaAcadFinal">

        <div className="novaAcadContainer">

          <div className="novaAcadFinalPanel">

            <img
              src={campusStudents}
              alt="Students at AB Public School"
            />

            <div className="novaAcadFinalOverlay"></div>


            <div className="novaAcadFinalContent">

              <span className="novaAcadFinalLabel">
                THEIR JOURNEY STARTS HERE
              </span>


              <h2>
                Give Them A Strong
                <span>
                  Start For Tomorrow.
                </span>
              </h2>


              <p>
                Discover an academic environment where learning,
                curiosity and confidence grow together.
              </p>


              <div className="novaAcadFinalButtons">

                <button
                  onClick={() => navigate("/apply")}
                >
                  Apply for Admission
                  <FaArrowRight />
                </button>


                <button onClick={callSchool}>
                  <FaPhoneAlt />
                  Talk to Our Team
                </button>

              </div>

            </div>


            <div className="novaAcadFinalSeal">

              <FaGraduationCap />

              <small>
                AB PUBLIC
              </small>

              <strong>
                SCHOOL
              </strong>

            </div>

          </div>

        </div>

      </section>

    </main>
  );
};

export default Academics;