import React from "react";
import { useNavigate } from "react-router-dom";

import {
  FaFutbol,
  FaBasketballBall,
  FaRunning,
  FaTableTennis,
  FaDumbbell,
  FaUsers,
  FaBrain,
  FaTrophy,
  FaArrowRight,
} from "react-icons/fa";

import { GiShuttlecock, GiCricketBat } from "react-icons/gi";

import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

import "./Sports.css";

import footballImage from "../assets/football.jpg";
import basketballImage from "../assets/basketball.jpg";
import badmintonImage from "../assets/badminton.jpg";
import athleticsImage from "../assets/athletics.jpg";
import cricketImage from "../assets/cricket.jpg";
import tableTennisImage from "../assets/table-tennis.jpg";

const sportsData = [
  {
    id: 1,
    number: "01",
    title: "Football",
    subtitle: "TEAMWORK • DISCIPLINE • VICTORY",
    icon: FaFutbol,
    image: footballImage,
    description:
      "Football helps students develop stamina, coordination and teamwork while teaching them the importance of discipline, confidence and sportsmanship.",
    points: [
      "Regular practice sessions",
      "Inter-school tournaments",
      "Professional coaching",
    ],
  },
  {
    id: 2,
    number: "02",
    title: "Basketball",
    subtitle: "SPEED • SKILL • TEAM SPIRIT",
    icon: FaBasketballBall,
    image: basketballImage,
    description:
      "Basketball improves agility, focus and decision-making skills while encouraging students to work together and enjoy healthy competition.",
    points: [
      "Skill development training",
      "Friendly matches",
      "Team tournaments",
    ],
  },
  {
    id: 3,
    number: "03",
    title: "Badminton",
    subtitle: "FOCUS • AGILITY • FITNESS",
    icon: GiShuttlecock,
    image: badmintonImage,
    description:
      "Badminton develops reflexes, coordination and concentration while keeping students active, energetic and physically fit.",
    points: [
      "Professional coaching",
      "Singles & doubles practice",
      "Inter-school matches",
    ],
  },
  {
    id: 4,
    number: "04",
    title: "Athletics",
    subtitle: "SPEED • ENDURANCE • DETERMINATION",
    icon: FaRunning,
    image: athleticsImage,
    description:
      "Athletics helps students build endurance, speed and determination through running, fitness activities and track events.",
    points: [
      "Track training",
      "Running events",
      "Fitness development",
    ],
  },
  {
    id: 5,
    number: "05",
    title: "Cricket",
    subtitle: "SKILL • PATIENCE • TEAMWORK",
    icon: GiCricketBat,
    image: cricketImage,
    description:
      "Cricket teaches patience, concentration and teamwork while giving students opportunities to develop batting, bowling and fielding skills.",
    points: [
      "Batting practice",
      "Bowling sessions",
      "Inter-house matches",
    ],
  },
  {
    id: 6,
    number: "06",
    title: "Table Tennis",
    subtitle: "REFLEX • PRECISION • FOCUS",
    icon: FaTableTennis,
    image: tableTennisImage,
    description:
      "Table tennis develops quick reflexes, hand-eye coordination and concentration through fast-paced and skill-focused training.",
    points: [
      "Regular practice",
      "Singles & doubles",
      "School competitions",
    ],
  },
];

const Sports = () => {
  const navigate = useNavigate();

  return (
    <>
      <Navbar />

      <main className="absport-page">
       

        <section className="absport-intro">
          <div className="absport-introContent">
            <span className="absport-introLabel">
              OUR SPORTS
            </span>

            <h2>
              More Than
              <span> Just Games</span>
            </h2>

            <p>
              We offer a wide range of sports to help students
              stay active, build confidence and develop lifelong
              skills.
            </p>

            <div className="absport-introLine"></div>
          </div>
        </section>

        <section className="absport-sportsSection">
          <div className="absport-sportsContainer">
            {sportsData.map((sport, index) => {
              const SportIcon = sport.icon;

              return (
                <article
                  className={`absport-sportRow ${
                    index % 2 !== 0
                      ? "absport-reverse"
                      : ""
                  }`}
                  key={sport.id}
                >
                  <div className="absport-imageBox">
                    <img
                      src={sport.image}
                      alt={`${sport.title} at AB Public School`}
                    />

                    <div className="absport-imageOverlay"></div>

                    <div className="absport-imageNumber">
                      {sport.number}
                    </div>

                    <div className="absport-imageIcon">
                      <SportIcon />
                    </div>
                  </div>

                  <div className="absport-sportContent">
                    <span className="absport-sportSubtitle">
                      {sport.subtitle}
                    </span>

                    <h3>{sport.title}</h3>

                    <p>{sport.description}</p>

                    <ul>
                      {sport.points.map((point, pointIndex) => (
                        <li key={pointIndex}>
                          <span>✓</span>
                          {point}
                        </li>
                      ))}
                    </ul>

                    <button
                      onClick={() =>
                        navigate(`/sports/${sport.id}`)
                      }
                    >
                      Learn More
                      <FaArrowRight />
                    </button>
                  </div>
                </article>
              );
            })}
          </div>
        </section>

        <section className="absport-why">
          <div className="absport-whyContainer">
            <div className="absport-whyText">
              <span>WHY SPORTS?</span>

              <h2>
                Building Champions
                On And Off The Field
              </h2>

              <p>
                Sports at AB Public School go beyond
                competition. They build character,
                confidence and a healthier future
                for every student.
              </p>

              <button
                onClick={() => navigate("/contact")}
              >
                Join Our Sports Programme
                <FaArrowRight />
              </button>
            </div>

            <div className="absport-benefits">
              <div className="absport-benefit">
                <div>
                  <FaDumbbell />
                </div>
                <span>Better</span>
                <strong>Fitness</strong>
              </div>

              <div className="absport-benefit">
                <div>
                  <FaUsers />
                </div>
                <span>Stronger</span>
                <strong>Teamwork</strong>
              </div>

              <div className="absport-benefit">
                <div>
                  <FaBrain />
                </div>
                <span>Improved</span>
                <strong>Focus</strong>
              </div>

              <div className="absport-benefit">
                <div>
                  <FaTrophy />
                </div>
                <span>Lifelong</span>
                <strong>Skills</strong>
              </div>
            </div>

            <div className="absport-quote">
              <span>“</span>

              <p>
                Sports do not build character.
                They reveal it.
              </p>

              <small>— Heywood Broun</small>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
};

export default Sports;