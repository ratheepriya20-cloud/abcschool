import React from "react";
import { useNavigate, useParams } from "react-router-dom";

import {
  FaFutbol,
  FaBasketballBall,
  FaRunning,
  FaTableTennis,
  FaDumbbell,
  FaUsers,
  FaBrain,
  FaTrophy,
  FaBullseye,
  FaBolt,
  FaEye,
  FaHeart,
  FaMedal,
  FaCheck,
  FaArrowLeft,
  FaArrowRight,
  FaStar,
} from "react-icons/fa";

import { GiShuttlecock, GiCricketBat } from "react-icons/gi";

import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

import footballImage from "../assets/football.jpg";
import basketballImage from "../assets/basketball.jpg";
import badmintonImage from "../assets/badminton.jpg";
import athleticsImage from "../assets/athletics.jpg";
import cricketImage from "../assets/cricket.jpg";
import tableTennisImage from "../assets/table-tennis.jpg";

import "./SportsDetail.css";

const sportsDetails = {
  1: {
    title: "Football",
    subtitle: "TEAMWORK • DISCIPLINE • VICTORY",
    icon: FaFutbol,
    image: footballImage,

    intro:
      "Football at AB Public School encourages students to stay active, work together and develop confidence through teamwork and healthy competition.",

    description:
      "Our football programme provides students with opportunities to develop their football skills in a supportive and disciplined environment. Students learn passing, dribbling, ball control, shooting and defensive techniques while also understanding the importance of teamwork and sportsmanship.",

    skills: [
      "Ball Control",
      "Passing & Dribbling",
      "Shooting",
      "Teamwork",
      "Fitness",
     
    ],

    activities: [
      "Regular football practice",
      "Inter-house football matches",
      "Inter-school tournaments",
      "Football skill development",
      "Fitness and endurance training",
      "Team strategy sessions",
    ],

    benefits: [
      {
        icon: FaDumbbell,
        title: "Physical Fitness",
        text: "Improves stamina, strength, speed and overall physical fitness.",
      },
      {
        icon: FaUsers,
        title: "Teamwork",
        text: "Students learn cooperation, communication and team responsibility.",
      },
      {
        icon: FaBullseye,
        title: "Focus",
        text: "Develops concentration and quick decision-making abilities.",
      },
      {
        icon: FaTrophy,
        title: "Confidence",
        text: "Participation builds confidence and a positive competitive spirit.",
      },
    ],
  },

  2: {
    title: "Basketball",
    subtitle: "SPEED • SKILL • TEAM SPIRIT",
    icon: FaBasketballBall,
    image: basketballImage,

    intro:
      "Basketball helps students develop agility, coordination, confidence and strong team spirit through energetic training and competition.",

    description:
      "Our basketball programme focuses on fundamental skills such as dribbling, passing, shooting and defensive movement. Students are encouraged to participate in practice sessions and matches while learning discipline, communication and teamwork.",

    skills: [
      "Dribbling",
      "Passing",
      "Shooting",
      "Defence",
      
      "Teamwork",
    ],

    activities: [
      "Basketball practice sessions",
      "Shooting drills",
      "Dribbling exercises",
      "Friendly matches",
      "Inter-house competitions",
      "Team tournaments",
    ],

    benefits: [
      {
        icon: FaBolt,
        title: "Agility",
        text: "Develops quick movement, balance and body coordination.",
      },
      {
        icon: FaUsers,
        title: "Team Spirit",
        text: "Encourages communication and cooperation between players.",
      },
      {
        icon: FaBrain,
        title: "Decision Making",
        text: "Students learn to make quick decisions during gameplay.",
      },
      {
        icon: FaTrophy,
        title: "Competition",
        text: "Builds confidence through healthy competitive experiences.",
      },
    ],
  },

  3: {
    title: "Badminton",
    subtitle: "FOCUS • AGILITY • FITNESS",
    icon: GiShuttlecock,
    image: badmintonImage,

    intro:
      "Badminton develops quick reflexes, hand-eye coordination and concentration while keeping students active and energetic.",

    description:
      "Students are introduced to the fundamentals of badminton including serving, footwork, racket control, attacking shots and defensive play. The programme supports both individual skill development and competitive participation.",

    skills: [
      "Racket Control",
      "Serving",
      "Footwork",
      
      "Reflexes",
      "Coordination",
    ],

    activities: [
      "Singles practice",
      "Doubles practice",
      "Serving drills",
      "Footwork training",
      "Inter-school matches",
      "School competitions",
    ],

    benefits: [
      {
        icon: FaEye,
        title: "Concentration",
        text: "Improves attention and concentration through fast-paced gameplay.",
      },
      {
        icon: FaBolt,
        title: "Quick Reflexes",
        text: "Develops fast reactions and better movement control.",
      },
      {
        icon: FaRunning,
        title: "Agility",
        text: "Encourages quick footwork, balance and body coordination.",
      },
      {
        icon: FaBullseye,
        title: "Precision",
        text: "Students develop accuracy and control in their shots.",
      },
    ],
  },

  4: {
    title: "Athletics",
    subtitle: "SPEED • ENDURANCE • DETERMINATION",
    icon: FaRunning,
    image: athleticsImage,

    intro:
      "Athletics gives students a platform to improve speed, endurance, strength and determination through a variety of track and field activities.",

    description:
      "Our athletics programme encourages students to participate in running and fitness-based activities. Training focuses on physical conditioning, discipline and personal improvement while preparing students for school-level and inter-school competitions.",

    skills: [
      "Running",
      "Sprint Training",
      
      "Strength",
      "Coordination",
      "Discipline",
    ],

    activities: [
      "Sprint practice",
      "Long-distance running",
      "Fitness training",
      "Track events",
      "Annual sports competitions",
      "Inter-school athletics",
    ],

    benefits: [
      {
        icon: FaRunning,
        title: "Speed",
        text: "Helps students improve running speed and movement efficiency.",
      },
      {
        icon: FaDumbbell,
        title: "Strength",
        text: "Builds physical strength and overall body conditioning.",
      },
      {
        icon: FaHeart,
        title: "Endurance",
        text: "Improves stamina and cardiovascular fitness.",
      },
      {
        icon: FaBullseye,
        title: "Determination",
        text: "Encourages students to set goals and continuously improve.",
      },
    ],
  },

  5: {
    title: "Cricket",
    subtitle: "SKILL • PATIENCE • TEAMWORK",
    icon: GiCricketBat,
    image: cricketImage,

    intro:
      "Cricket teaches patience, concentration and teamwork while giving students opportunities to develop batting, bowling and fielding skills.",

    description:
      "Our cricket programme provides students with opportunities to learn and practise essential cricket techniques. Students work on batting, bowling, fielding and match awareness while developing discipline and team spirit.",

    skills: [
      "Batting",
      "Bowling",
      "Fielding",
      "Catching",
      "Match Awareness",
      
    ],

    activities: [
      "Batting practice",
      "Bowling sessions",
      "Fielding drills",
      "Catching practice",
      "Inter-house matches",
      "School cricket tournaments",
    ],

    benefits: [
      {
        icon: FaMedal,
        title: "Skill Development",
        text: "Students develop batting, bowling and fielding techniques.",
      },
      {
        icon: FaBrain,
        title: "Concentration",
        text: "Builds patience, focus and strategic thinking.",
      },
      {
        icon: FaUsers,
        title: "Teamwork",
        text: "Encourages players to support and communicate with teammates.",
      },
      {
        icon: FaTrophy,
        title: "Sportsmanship",
        text: "Teaches respect, discipline and healthy competition.",
      },
    ],
  },

  6: {
    title: "Table Tennis",
    subtitle: "REFLEX • PRECISION • FOCUS",
    icon: FaTableTennis,
    image: tableTennisImage,

    intro:
      "Table tennis develops quick reflexes, hand-eye coordination and concentration through fast-paced and skill-focused training.",

    description:
      "Students learn the fundamentals of table tennis including serving, forehand and backhand strokes, footwork and match techniques. Regular practice helps students improve accuracy, reaction time and confidence.",

    skills: [
      "Serving",
      "Forehand",
      "Backhand",
      "Footwork",
      "Reflexes",
      
    ],

    activities: [
      "Regular practice",
      "Serving drills",
      "Forehand practice",
      "Backhand practice",
      "Singles matches",
      "Doubles competitions",
    ],

    benefits: [
      {
        icon: FaBolt,
        title: "Reflexes",
        text: "Improves reaction speed through fast-paced rallies.",
      },
      {
        icon: FaBullseye,
        title: "Precision",
        text: "Develops accuracy, control and consistency.",
      },
      {
        icon: FaEye,
        title: "Coordination",
        text: "Improves hand-eye coordination and movement.",
      },
      {
        icon: FaBrain,
        title: "Focus",
        text: "Encourages concentration and strategic thinking.",
      },
    ],
  },
};

const SportsDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const sport = sportsDetails[id];

  if (!sport) {
    return (
      <>
        <Navbar />

        <main className="absd-notFound">
          <div className="absd-notFoundCard">
            <div className="absd-notFoundIcon">
              <FaStar />
            </div>

            <span>SPORTS PROGRAMME</span>

            <h1>Sport Not Found</h1>

            <p>
              The sports programme you are looking for could not be found.
            </p>

            <button onClick={() => navigate("/sports")}>
              <FaArrowLeft />
              Back to Sports
            </button>
          </div>
        </main>

        <Footer />
      </>
    );
  }

  const SportIcon = sport.icon;

  return (
    <>
      <Navbar />

      <main className="absd-page">

        <section className="absd-hero">
          <div className="absd-heroImageWrap">
            <img
              src={sport.image}
              alt={`${sport.title} at AB Public School`}
              className="absd-heroImage"
            />
          </div>

          <div className="absd-heroOverlay"></div>

          <div className="absd-heroContent">
            <button
              className="absd-back"
              onClick={() => navigate("/sports")}
            >
              <FaArrowLeft />
              All Sports
            </button>

            <span className="absd-eyebrow">
              ACTIVITIES • SPORTS
            </span>

            <div className="absd-heroIcon">
              <SportIcon />
            </div>

            <h1>{sport.title}</h1>

            <p>{sport.subtitle}</p>

            <div className="absd-heroLine"></div>

            <div className="absd-heroStats">
              <div>
                <strong>{sport.skills.length}</strong>
                <span>Core Skills</span>
              </div>

              <div>
                <strong>{sport.activities.length}</strong>
                <span>Activities</span>
              </div>

              <div>
                <strong>01</strong>
                <span>School Programme</span>
              </div>
            </div>
          </div>

          
        </section>

        <section className="absd-intro">
          <div className="absd-container">
            <div className="absd-introTop">
              <span className="absd-sectionLabel">
                {sport.title.toUpperCase()} PROGRAMME
              </span>

              <div className="absd-introAccent"></div>
            </div>

            <h2>
              Learn. Practice.
              <span> Perform.</span>
            </h2>

            <p>{sport.intro}</p>
          </div>
        </section>

        <section className="absd-about">
          <div className="absd-container absd-aboutGrid">

            <div className="absd-aboutImage">
              <img
                src={sport.image}
                alt={`${sport.title} programme`}
              />

              <div className="absd-aboutImageShade"></div>

              <div className="absd-imageBadge">
                <div>
                  <SportIcon />
                </div>

                <section>
                  <span>SPORTS PROGRAMME</span>
                  <strong>{sport.title}</strong>
                </section>
              </div>

              <div className="absd-imageNumber">01</div>
            </div>

            <div className="absd-aboutText">
              <span className="absd-sectionLabel">
                ABOUT THE PROGRAMME
              </span>

              <h2>
                Building Skills
                <br />
                Through <span>Sport</span>
              </h2>

              <p>{sport.description}</p>

              <div className="absd-aboutMiniGrid">
                <div>
                  <FaCheck />
                  <span>Structured Training</span>
                </div>

                <div>
                  <FaCheck />
                  <span>Healthy Competition</span>
                </div>

                <div>
                  <FaCheck />
                  <span>Team Development</span>
                </div>

                <div>
                  <FaCheck />
                  <span>Confidence Building</span>
                </div>
              </div>

              <button
                onClick={() => navigate("/contact")}
                className="absd-primaryBtn"
              >
                Join Our Sports Programme
                <FaArrowRight />
              </button>
            </div>

          </div>
        </section>

        <section className="absd-skills">
          <div className="absd-container">

            <div className="absd-sectionHeading">
              <div>
                <span className="absd-sectionLabel">
                  CORE SKILLS
                </span>

                <h2>
                  What Students
                  <span> Develop</span>
                </h2>
              </div>

              <p>
                Every session helps students strengthen practical skills,
                discipline and confidence.
              </p>
            </div>

            <div className="absd-skillGrid">
              {sport.skills.map((skill, index) => (
                <div
                  className="absd-skillCard"
                  key={skill}
                >
                  <span className="absd-skillNumber">
                    {String(index + 1).padStart(2, "0")}
                  </span>

                  <div className="absd-skillIcon">
                    <FaCheck />
                  </div>

                  <strong>{skill}</strong>

                  <FaArrowRight className="absd-skillArrow" />
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="absd-activities">
          <div className="absd-container">

            <div className="absd-sectionHeading absd-activitiesHeading">
              <div>
                <span className="absd-sectionLabel">
                  TRAINING & EVENTS
                </span>

                <h2>
                  What We
                  <span> Offer</span>
                </h2>
              </div>

              <p>
                Students get regular opportunities to practise, participate
                and represent the school.
              </p>
            </div>

            <div className="absd-activitiesGrid">
              {sport.activities.map((activity, index) => (
                <div
                  className="absd-activityCard"
                  key={activity}
                >
                  <div className="absd-activityNumber">
                    {String(index + 1).padStart(2, "0")}
                  </div>

                  <div className="absd-activityLine"></div>

                  <div className="absd-activityContent">
                    <span>SPORT ACTIVITY</span>
                    <strong>{activity}</strong>
                  </div>

                  <div className="absd-activityArrow">
                    <FaArrowRight />
                  </div>
                </div>
              ))}
            </div>

          </div>
        </section>

        <section className="absd-benefits">
          <div className="absd-container">

            <div className="absd-headingCenter">
              <span className="absd-sectionLabel">
                WHY PARTICIPATE?
              </span>

              <h2>
                Benefits Beyond
                <span> The Game</span>
              </h2>

              <p>
                Sports help students grow physically, mentally and socially.
              </p>
            </div>

            <div className="absd-benefitGrid">
              {sport.benefits.map((benefit, index) => {
                const BenefitIcon = benefit.icon;

                return (
                  <article
                    className="absd-benefitCard"
                    key={benefit.title}
                  >
                    <div className="absd-benefitTop">
                      <span>
                        0{index + 1}
                      </span>

                      <div className="absd-benefitIcon">
                        <BenefitIcon />
                      </div>
                    </div>

                    <h3>{benefit.title}</h3>

                    <p>{benefit.text}</p>

                    <div className="absd-benefitBottom">
                      <span>STUDENT DEVELOPMENT</span>
                      <FaArrowRight />
                    </div>
                  </article>
                );
              })}
            </div>
          </div>
        </section>

        <section className="absd-cta">
          <div className="absd-ctaGlowOne"></div>
          <div className="absd-ctaGlowTwo"></div>

          <div className="absd-container absd-ctaInner">
            <div className="absd-ctaIcon">
              <SportIcon />
            </div>

            <div className="absd-ctaText">
              <span className="absd-sectionLabel">
                AB PUBLIC SCHOOL
              </span>

              <h2>
                Ready to
                <span> Play?</span>
              </h2>

              <p>
                Encourage your child to participate, discover their potential
                and grow through sports.
              </p>
            </div>

            <div className="absd-ctaButtons">
              <button
                onClick={() => navigate("/contact")}
                className="absd-primaryBtn"
              >
                Contact School
                <FaArrowRight />
              </button>

              <button
                onClick={() => navigate("/sports")}
                className="absd-secondaryBtn"
              >
                Explore All Sports
              </button>
            </div>
          </div>
        </section>

      </main>

      <Footer />
    </>
  );
};

export default SportsDetail;