import React from "react";
import { useNavigate } from "react-router-dom";
import "./Activities.css";

const activitiesData = [
  {
    id: 1,
    title: "Sports",
    subtitle: "PLAY • PERFORM • EXCEL",
    description:
      "Developing teamwork, discipline, confidence and a healthy competitive spirit through a wide range of sports.",
    items: [
      "Football",
      "Basketball",
      "Cricket",
      "Athletics",
      "Badminton",
      "Table Tennis",
    ],
    icon: "⚽",
    number: "01",
    path: "/activities/sports",
  },
  {
    id: 2,
    title: "Cultural Activities",
    subtitle: "CREATE • EXPRESS • CELEBRATE",
    description:
      "Students explore their creativity and cultural identity through music, dance, drama, art and celebrations.",
    items: [
      "Music",
      "Dance",
      "Drama",
      "Art & Craft",
      "Annual Functions",
      "Cultural Events",
    ],
    icon: "🎭",
    number: "02",
    path: "/activities/cultural",
  },
  {
    id: 3,
    title: "School Clubs",
    subtitle: "DISCOVER • LEARN • LEAD",
    description:
      "Interest-based clubs give students opportunities to discover new passions and develop leadership skills.",
    items: [
      "Science Club",
      "Literary Club",
      "Eco Club",
      "Art Club",
      "Coding Club",
      "Quiz Club",
    ],
    icon: "✦",
    number: "03",
    path: "/activities/clubs",
  },
  {
    id: 4,
    title: "Competitions",
    subtitle: "CHALLENGE • COMPETE • ACHIEVE",
    description:
      "Healthy competitions encourage students to challenge themselves, showcase their talents and celebrate achievement.",
    items: [
      "Quiz Competitions",
      "Debates",
      "Essay Writing",
      "Olympiads",
      "Sports Meets",
      "Art Competitions",
    ],
    icon: "🏆",
    number: "04",
    path: "/activities/competitions",
  },
  {
    id: 5,
    title: "Educational Tips",
    subtitle: "LEARN • GROW • SUCCEED",
    description:
      "Useful learning strategies and study habits that help students become confident, independent and effective learners.",
    items: [
      "Study Techniques",
      "Time Management",
      "Exam Preparation",
      "Reading Habits",
      "Memory Tips",
      "Digital Learning",
    ],
    icon: "📚",
    number: "05",
    path: "/activities/education-tips",
  },
];

const Activities = () => {
  const navigate = useNavigate();

  return (
    <main className="abact-page">

      {/* =====================================================
          HERO
      ===================================================== */}

      <section className="abact-hero">

        <div className="abact-heroGlow abact-heroGlowOne"></div>
        <div className="abact-heroGlow abact-heroGlowTwo"></div>

        <div className="abact-heroContent">

          <span className="abact-eyebrow">
            LIFE BEYOND THE CLASSROOM
          </span>

          <h1>
            Learn. Explore.
            <span>Achieve Together.</span>
          </h1>

          <p>
            At AB Public School, learning extends far beyond textbooks.
            Our activities help students discover their talents,
            build confidence and create unforgettable memories.
          </p>

          <div className="abact-heroLine">
            <i></i>
            <span>ACTIVITIES & STUDENT LIFE</span>
            <i></i>
          </div>

        </div>

      </section>


      {/* =====================================================
          INTRO
      ===================================================== */}

      <section className="abact-intro">

        <div className="abact-introHeading">

          <span>
            DISCOVER YOUR PASSION
          </span>

          <h2>
            Something for
            <strong>Every Student.</strong>
          </h2>

        </div>

        <p>
          From sports fields and creative stages to academic
          competitions and student-led clubs, every experience
          at AB Public School is designed to help children grow
          beyond the classroom.
        </p>

      </section>


      {/* =====================================================
          ACTIVITIES GRID
      ===================================================== */}

      <section className="abact-gridSection">

        <div className="abact-grid">

          {activitiesData.map((activity) => (

            <article
              className={`abact-card abact-card-${activity.id}`}
              key={activity.id}
              onClick={() => navigate(activity.path)}
            >

              <div className="abact-cardTop">

                <span className="abact-number">
                  {activity.number}
                </span>

                <div className="abact-icon">
                  {activity.icon}
                </div>

              </div>


              <div className="abact-cardContent">

                <span className="abact-cardSubtitle">
                  {activity.subtitle}
                </span>

                <h3>
                  {activity.title}
                </h3>

                <p>
                  {activity.description}
                </p>

              </div>


              <div className="abact-items">

                {activity.items.map((item) => (
                  <span key={item}>
                    {item}
                  </span>
                ))}

              </div>


              <div className="abact-cardBottom">

                <span>
                  Explore {activity.title}
                </span>

                <b>
                  →
                </b>

              </div>

            </article>

          ))}

        </div>

      </section>


      {/* =====================================================
          EXPERIENCE STRIP
      ===================================================== */}

      <section className="abact-experience">

        <div className="abact-experienceContent">

          <span>
            MORE THAN ACTIVITIES
          </span>

          <h2>
            Every Experience
            <strong>Builds Character.</strong>
          </h2>

          <p>
            Whether a student scores a winning goal, performs on
            stage, wins a competition or discovers a new interest,
            every experience teaches something valuable.
          </p>

        </div>


        <div className="abact-stats">

          <div>
            <strong>25+</strong>
            <span>Activities</span>
          </div>

          <div>
            <strong>10+</strong>
            <span>Student Clubs</span>
          </div>

          <div>
            <strong>50+</strong>
            <span>Annual Events</span>
          </div>

          <div>
            <strong>100%</strong>
            <span>Participation</span>
          </div>

        </div>

      </section>


      {/* =====================================================
          STUDENT QUOTE
      ===================================================== */}

      <section className="abact-quoteSection">

        <div className="abact-quoteMark">
          “
        </div>

        <blockquote>
          School becomes more memorable when students have
          opportunities to discover what they love.
        </blockquote>

        <span>
          — AB PUBLIC SCHOOL
        </span>

      </section>


      {/* =====================================================
          CTA
      ===================================================== */}

      <section className="abact-cta">

        <div>

          <span>
            MAKE THE MOST OF SCHOOL LIFE
          </span>

          <h2>
            Find Something
            <strong>You Love.</strong>
          </h2>

        </div>

        <button
          onClick={() => navigate("/contact")}
        >
          Talk to Our School
          <span>→</span>
        </button>

      </section>

    </main>
  );
};

export default Activities;