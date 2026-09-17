import React from "react";
import { useNavigate } from "react-router-dom";

import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import "./Cultural.css";

import {
  FaTheaterMasks,
  FaMusic,
  FaPaintBrush,
  FaGlassCheers,
  FaMicrophone,
  FaArrowRight,
  FaStar,
  FaPalette,
  FaUsers,
  FaLightbulb,
  FaHeart,
} from "react-icons/fa";

import dramaImage from "../assets/drama.jpg";
import danceImage from "../assets/dance.jpg";
import musicImage from "../assets/music.jpg";
import artImage from "../assets/student-art.jpg";
import festivalImage from "../assets/festival.jpg";
import culturalEventImage from "../assets/student-cultural.jpg";

const culturalData = [
  {
    id: 1,
    number: "01",
    title: "Drama & Theatre",
    subtitle: "ACT • EXPRESS • INSPIRE",
    icon: <FaTheaterMasks />,
    image: dramaImage,
    description:
      "Drama and theatre activities help students express themselves confidently, understand different perspectives and develop strong communication skills.",
    points: [
      "Stage Performances",
      "Role Plays",
      "School Plays",
      "Public Speaking",
    ],
  },
  {
    id: 2,
    number: "02",
    title: "Dance",
    subtitle: "MOVE • EXPRESS • CELEBRATE",
    icon: <FaUsers />,
    image: danceImage,
    description:
      "Dance gives students a creative way to express emotions while developing rhythm, coordination, confidence and appreciation for cultural traditions.",
    points: [
      "Classical Dance",
      "Folk Dance",
      "Contemporary Dance",
      "Cultural Performances",
    ],
  },
  {
    id: 3,
    number: "03",
    title: "Music & Singing",
    subtitle: "LISTEN • PERFORM • CREATE",
    icon: <FaMusic />,
    image: musicImage,
    description:
      "Our music activities encourage students to discover their musical talents through singing, instruments, group performances and school events.",
    points: [
      "Choir",
      "Instrumental Music",
      "Solo Singing",
      "School Orchestra",
    ],
  },
  {
    id: 4,
    number: "04",
    title: "Art & Creativity",
    subtitle: "IMAGINE • CREATE • DISCOVER",
    icon: <FaPaintBrush />,
    image: artImage,
    description:
      "Art activities encourage imagination and creative thinking while allowing students to explore colours, designs, crafts and different artistic techniques.",
    points: [
      "Painting",
      "Sketching",
      "Craft Activities",
      "Creative Exhibitions",
    ],
  },
  {
    id: 5,
    number: "05",
    title: "Festivals & Celebrations",
    subtitle: "TRADITION • TOGETHERNESS • JOY",
    icon: <FaGlassCheers />,
    image: festivalImage,
    description:
      "School celebrations bring students together to experience different traditions, cultures and festivals while learning the importance of respect and unity.",
    points: [
      "Cultural Festivals",
      "Special Assemblies",
      "Traditional Events",
      "Celebration Programs",
    ],
  },
  {
    id: 6,
    number: "06",
    title: "Annual Cultural Events",
    subtitle: "PERFORM • PARTICIPATE • SHINE",
    icon: <FaMicrophone />,
    image: culturalEventImage,
    description:
      "Annual cultural events provide students with a platform to showcase their talents, build confidence and celebrate the achievements of our school community.",
    points: [
      "Annual Day",
      "Talent Shows",
      "Cultural Programs",
      "Student Performances",
    ],
  },
];

const Cultural = () => {
  const navigate = useNavigate();

  const handleLearnMore = (id) => {
    navigate(`/cultural/${id}`);
  };

  return (
    <>
    <Navbar />
    <div className="abcultural-page">
      

      <main>
        {/* =========================
            HERO
        ========================= */}
        <section className="abcultural-hero">
          <div className="abcultural-heroOverlay"></div>

          <div className="abcultural-heroGlow abcultural-glowOne"></div>
          <div className="abcultural-heroGlow abcultural-glowTwo"></div>

          <div className="abcultural-heroContent">
            <span className="abcultural-eyebrow">
              <span className="abcultural-eyebrowLine"></span>
              CULTURAL ACTIVITIES
              <span className="abcultural-eyebrowLine"></span>
            </span>

            <h1>
              Celebrate.
              <span>Create. Inspire.</span>
            </h1>

            <p>
              Discover a world of creativity, expression and culture where
              every student gets the opportunity to explore their talent and
              shine with confidence.
            </p>

            <div className="abcultural-heroBottom">
              <div className="abcultural-heroLine"></div>

              <span>
                <FaStar />
                CREATIVITY • CULTURE • CONFIDENCE
              </span>

              <div className="abcultural-heroLine"></div>
            </div>
          </div>
        </section>

        {/* =========================
            INTRO
        ========================= */}
        <section className="abcultural-intro">
          <div className="abcultural-container">
            <div className="abcultural-introGrid">
              <div className="abcultural-introLabel">
                <span>01</span>
                <div></div>
                <p>CULTURE & CREATIVITY</p>
              </div>

              <div className="abcultural-introContent">
                <span className="abcultural-smallLabel">
                  BEYOND THE CLASSROOM
                </span>

                <h2>
                  Every Student
                  <span>Has A Story.</span>
                </h2>

                <p>
                  Cultural activities give students a platform to express
                  themselves, discover hidden talents and build confidence.
                  From theatre and dance to music, art and celebrations,
                  students experience learning in a completely different way.
                </p>

                <div className="abcultural-introFeatures">
                  <div>
                    <FaPalette />
                    <span>Creative Expression</span>
                  </div>

                  <div>
                    <FaUsers />
                    <span>Team Participation</span>
                  </div>

                  <div>
                    <FaLightbulb />
                    <span>New Ideas</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* =========================
            CULTURAL ACTIVITIES
        ========================= */}
        <section className="abcultural-activities">
          <div className="abcultural-container">
            <div className="abcultural-sectionHeader">
              <div>
                <span className="abcultural-smallLabel">
                  OUR CULTURAL WORLD
                </span>

                <h2>
                  Explore.
                  <span>Express. Excel.</span>
                </h2>
              </div>

              <p>
                A vibrant collection of activities designed to help students
                discover their interests, celebrate culture and develop
                confidence.
              </p>
            </div>

            <div className="abcultural-list">
              {culturalData.map((item, index) => (
                <article
                  className={`abcultural-card ${
                    index % 2 !== 0 ? "abcultural-cardReverse" : ""
                  }`}
                  key={item.id}
                >
                  {/* IMAGE */}
                  <div className="abcultural-imageBox">
                    <img src={item.image} alt={item.title} />

                    <div className="abcultural-imageOverlay"></div>

                    <span className="abcultural-cardNumber">
                      {item.number}
                    </span>

                    <div className="abcultural-imageIcon">
                      {item.icon}
                    </div>
                  </div>

                  {/* CONTENT */}
                  <div className="abcultural-cardContent">
                    <span className="abcultural-cardSubtitle">
                      {item.subtitle}
                    </span>

                    <h3>{item.title}</h3>

                    <div className="abcultural-cardDivider"></div>

                    <p>{item.description}</p>

                    <div className="abcultural-points">
                      {item.points.map((point, pointIndex) => (
                        <div key={pointIndex}>
                          <FaStar />
                          <span>{point}</span>
                        </div>
                      ))}
                    </div>

                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* =========================
            BENEFITS
        ========================= */}
        <section className="abcultural-benefits">
          <div className="abcultural-container">
            <div className="abcultural-benefitsGrid">
              <div className="abcultural-benefitsContent">
                <span className="abcultural-smallLabel">
                  WHY CULTURAL ACTIVITIES MATTER
                </span>

                <h2>
                  Building
                  <span>Confident Creators.</span>
                </h2>

                <p>
                  Cultural participation helps students become confident,
                  creative and socially aware individuals who are comfortable
                  expressing their ideas and talents.
                </p>

                <div className="abcultural-benefitList">
                  <div>
                    <span className="abcultural-benefitIcon">
                      <FaHeart />
                    </span>

                    <div>
                      <h4>Builds Confidence</h4>
                      <p>
                        Students become comfortable performing and expressing
                        themselves.
                      </p>
                    </div>
                  </div>

                  <div>
                    <span className="abcultural-benefitIcon">
                      <FaUsers />
                    </span>

                    <div>
                      <h4>Develops Teamwork</h4>
                      <p>
                        Group performances teach cooperation and responsibility.
                      </p>
                    </div>
                  </div>

                  <div>
                    <span className="abcultural-benefitIcon">
                      <FaLightbulb />
                    </span>

                    <div>
                      <h4>Encourages Creativity</h4>
                      <p>
                        Students learn to think differently and create new
                        ideas.
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="abcultural-benefitVisual">
                <div className="abcultural-visualCard">
                  <FaPalette />

                  <strong>CREATE</strong>
                  <span>Something Beautiful</span>
                </div>

                <div className="abcultural-visualCard">
                  <FaTheaterMasks />

                  <strong>EXPRESS</strong>
                  <span>Your Unique Story</span>
                </div>

                <div className="abcultural-visualCard">
                  <FaMusic />

                  <strong>INSPIRE</strong>
                  <span>Everyone Around You</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* =========================
            STATS
        ========================= */}
        <section className="abcultural-stats">
          <div className="abcultural-container">
            <div className="abcultural-statsGrid">
              <div>
                <strong>06</strong>
                <span>Cultural Areas</span>
              </div>

              <div>
                <strong>20+</strong>
                <span>Annual Events</span>
              </div>

              <div>
                <strong>100%</strong>
                <span>Student Participation</span>
              </div>

              <div>
                <strong>∞</strong>
                <span>Creative Possibilities</span>
              </div>
            </div>
          </div>
        </section>

        {/* =========================
            QUOTE
        ========================= */}
        <section className="abcultural-quote">
          <div className="abcultural-container">
            <div className="abcultural-quoteBox">
              <span className="abcultural-quoteMark">“</span>

              <p>
                Education becomes more meaningful when students are given the
                freedom to create, perform, explore and express who they are.
              </p>

              <div className="abcultural-quoteLine"></div>

              <span>AB PUBLIC SCHOOL</span>
            </div>
          </div>
        </section>

        {/* =========================
            CTA
        ========================= */}
        <section className="abcultural-cta">
          <div className="abcultural-container">
            <div className="abcultural-ctaBox">
              <div>
                <span className="abcultural-smallLabel">
                  DISCOVER THE SCHOOL EXPERIENCE
                </span>

                <h2>
                  Let Your
                  <span>Talent Shine.</span>
                </h2>

                <p>
                  Explore our school community and discover more opportunities
                  for students to learn, grow and express themselves.
                </p>
              </div>

              <button
                className="abcultural-ctaBtn"
                onClick={() => navigate("/contact")}
              >
                <span>Contact School</span>
                <FaArrowRight />
              </button>
            </div>
          </div>
        </section>
      </main>

    </div>

    
      <Footer />
      </>
  );
};

export default Cultural;