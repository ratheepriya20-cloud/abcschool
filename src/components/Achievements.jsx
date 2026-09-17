import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  FaGraduationCap,
  FaUsers,
  FaAward,
  FaCheckCircle,
  FaChartLine,
  FaArrowRight,
} from "react-icons/fa";
import "./Achievements.css";

const achievements = [
  {
    id: 1,
    number: 1500,
    suffix: "+",
    title: "Students",
    text: "Growing learners",
    icon: FaGraduationCap,
  },
  {
    id: 2,
    number: 100,
    suffix: "+",
    title: "Teachers",
    text: "Dedicated mentors",
    icon: FaUsers,
  },
  {
    id: 3,
    number: 25,
    suffix: "+",
    title: "Years",
    text: "Educational legacy",
    icon: FaAward,
  },
  {
    id: 4,
    number: 98,
    suffix: "%",
    title: "Board Results",
    text: "Academic excellence",
    icon: FaCheckCircle,
  },
  {
    id: 5,
    number: 30,
    suffix: "+",
    title: "Activities",
    text: "Beyond classrooms",
    icon: FaChartLine,
  },
];

const AchievementCard = ({ item }) => {
  const [count, setCount] = useState(0);
  const cardRef = useRef(null);
  const startedRef = useRef(false);

  useEffect(() => {
    const element = cardRef.current;

    if (!element) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];

        if (entry.isIntersecting && !startedRef.current) {
          startedRef.current = true;

          let current = 0;
          const duration = 1500;
          const startTime = performance.now();

          const animate = (currentTime) => {
            const progress = Math.min(
              (currentTime - startTime) / duration,
              1
            );

            const easedProgress = 1 - Math.pow(1 - progress, 3);

            current = Math.floor(item.number * easedProgress);

            setCount(current);

            if (progress < 1) {
              requestAnimationFrame(animate);
            } else {
              setCount(item.number);
            }
          };

          requestAnimationFrame(animate);
        }
      },
      {
        threshold: 0.35,
      }
    );

    observer.observe(element);

    return () => observer.disconnect();
  }, [item.number]);

  const Icon = item.icon;

  return (
    <div className="premiumAchievementCard" ref={cardRef}>
      <div className="premiumAchievementTopLine"></div>

      <div className="premiumAchievementIcon">
        <Icon />
      </div>

      <div className="premiumAchievementNumber">
        {count}
        <span>{item.suffix}</span>
      </div>

      <h3>{item.title}</h3>

      <p>{item.text}</p>

      <div className="premiumAchievementBottom">
        <span></span>
        <span></span>
        <span></span>
      </div>
    </div>
  );
};

const Achievements = () => {
  const navigate = useNavigate();

  return (
    <section className="premiumAchievementSection">
      <div className="premiumAchievementGlow premiumAchievementGlowOne"></div>
      <div className="premiumAchievementGlow premiumAchievementGlowTwo"></div>

      <div className="premiumAchievementContainer">
        {/* HEADER */}
        <div className="premiumAchievementHeading">
          <div className="premiumAchievementLabel">
            <span></span>
            OUR ACHIEVEMENTS
            <span></span>
          </div>

          <h2>Milestones That Define Our Excellence</h2>

          <p>
            A journey of learning, leadership and achievement built together.
          </p>
        </div>

        {/* JOURNEY LABEL */}
        <div className="premiumAchievementJourney">
          <span className="premiumAchievementJourneyLine"></span>

          <div>
            <small>OUR JOURNEY</small>
            <strong>Excellence in every milestone.</strong>
          </div>

          <span className="premiumAchievementJourneyLine"></span>
        </div>

        {/* CARDS */}
        <div className="premiumAchievementGrid">
          {achievements.map((item) => (
            <AchievementCard key={item.id} item={item} />
          ))}
        </div>

        {/* BOTTOM CTA */}
        <div className="premiumAchievementCTA">
          <div className="premiumAchievementCTAText">
            <span>BEYOND THE NUMBERS</span>

            <h3>Every achievement has a story behind it.</h3>
          </div>

          <button
            type="button"
            onClick={() => navigate("/achievements")}
            className="premiumAchievementButton"
          >
            Explore Achievements
            <FaArrowRight />
          </button>
        </div>
      </div>
    </section>
  );
};

export default Achievements;