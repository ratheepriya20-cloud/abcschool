import React from "react";
import { useNavigate } from "react-router-dom";
import "./StudentLife.css";

import sportsImage from "../assets/student-sports.jpg";
import culturalImage from "../assets/student-cultural.jpg";
import artImage from "../assets/student-art.jpg";
import activityImage from "../assets/student-activity.jpg";

const activities = [
  {
    number: "01",
    title: "Sports & Fitness",
    text: "Building teamwork, discipline and confidence through sports.",
    image: sportsImage,
    tag: "SPORTS",
  },
  {
    number: "02",
    title: "Cultural Activities",
    text: "Celebrating talent, creativity and the spirit of togetherness.",
    image: culturalImage,
    tag: "CULTURE",
  },
  {
    number: "03",
    title: "Art & Creativity",
    text: "Giving young minds a space to imagine, create and express.",
    image: artImage,
    tag: "CREATIVITY",
  },
  {
    number: "04",
    title: "Clubs & Activities",
    text: "Learning new skills beyond the traditional classroom.",
    image: activityImage,
    tag: "ACTIVITIES",
  },
];

const StudentLife = () => {
  const navigate = useNavigate();

  return (
    <section className="studentLifeSection">

      {/* BACKGROUND SHAPES */}
      <div className="studentLifeGlow studentLifeGlowOne"></div>
      <div className="studentLifeGlow studentLifeGlowTwo"></div>

      <div className="studentLifeContainer">

        {/* HEADING */}
        <div className="studentLifeHeading">

          <div>
            <span className="studentLifeLabel">
              STUDENT LIFE
            </span>

            <h2>
              More Than
              <span>Just Classrooms.</span>
            </h2>
          </div>

          <p>
            School life is about discovering interests, building
            friendships, developing confidence and creating memories
            that stay with students for years.
          </p>

        </div>


        {/* ACTIVITY CARDS */}
        <div className="studentLifeGrid">

          {activities.map((activity) => (
            <div
              className="studentLifeCard"
              key={activity.number}
            >

              {/* IMAGE */}
              <div className="studentLifeImage">

                <img
                  src={activity.image}
                  alt={activity.title}
                />

                <div className="studentLifeImageOverlay"></div>

                <span className="studentLifeTag">
                  {activity.tag}
                </span>

                <span className="studentLifeNumber">
                  {activity.number}
                </span>

              </div>


              {/* CONTENT */}
              <div className="studentLifeCardContent">

                <h3>{activity.title}</h3>

                <p>{activity.text}</p>

                <span className="studentLifeCardArrow">
                  ↗
                </span>

              </div>

            </div>
          ))}

        </div>


        {/* CTA */}
        <div className="studentLifeCTA">

          <div className="studentLifeCTAText">

            <span>DISCOVER THE SCHOOL EXPERIENCE</span>

            <strong>
              Every student has something special to discover.
            </strong>

          </div>

          <button
            onClick={() => navigate("/student-life")}
          >
            Explore Student Life
            <span>→</span>
          </button>

        </div>

      </div>

    </section>
  );
};

export default StudentLife;