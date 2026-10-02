import React from "react";
import { Link } from "react-router-dom";
import {
  FaArrowRight,
  FaBookOpen,
  FaUsers,
  FaLightbulb,
  FaGraduationCap,
} from "react-icons/fa";
import "./AboutIntro.css";
import schoolCampus from "../assets/school-campus.jpg";

const AboutIntro = () => {
  const features = [
    {
      icon: <FaBookOpen />,
      title: "Academic Growth",
      text: "Building strong knowledge and learning foundations.",
    },
    {
      icon: <FaUsers />,
      title: "Student Community",
      text: "Encouraging collaboration, respect and belonging.",
    },
    {
      icon: <FaLightbulb />,
      title: "Creative Thinking",
      text: "Helping students explore ideas and solve problems.",
    },
    {
      icon: <FaGraduationCap />,
      title: "Character Building",
      text: "Developing confidence, values and responsibility.",
    },
  ];

  return (
    <section className="abpsAboutIntroPremium">
      <div className="abpsAboutIntroPremiumContainer">

        {/* TOP HEADING */}
        <div className="abpsAboutIntroPremiumHeader">

          <div className="abpsAboutIntroPremiumLabel">
            <span></span>
            WHO WE ARE
          </div>

          <h2>
            Education That Builds
            <em> More Than Knowledge.</em>
          </h2>

          <p>
            At AB Public School, we believe education is about much more
            than completing a curriculum. We create an environment where
            students are encouraged to question, explore, express ideas,
            build confidence and discover their potential.
          </p>

        </div>

        {/* MAIN AREA */}
        <div className="abpsAboutIntroPremiumMain">

          {/* IMAGE SIDE */}
          <div className="abpsAboutIntroPremiumVisual">

            <div className="abpsAboutIntroPremiumImage">

              <img
                src={schoolCampus}
                alt="AB Public School campus"
              />

              <div className="abpsAboutIntroPremiumOverlay"></div>

              <div className="abpsAboutIntroPremiumImageText">
                <span>AB PUBLIC SCHOOL</span>
                <strong>
                  Learning With
                  <br />
                  Purpose
                </strong>
              </div>

            </div>

            <div className="abpsAboutIntroPremiumYear">
              <strong>25+</strong>
              <span>YEARS OF<br />EXCELLENCE</span>
            </div>

            <div className="abpsAboutIntroPremiumImageCaption">
              <span>OUR JOURNEY</span>
              <strong>Knowledge • Character • Confidence</strong>
            </div>

          </div>

          {/* CONTENT SIDE */}
          <div className="abpsAboutIntroPremiumContent">

          

            <h3>
              Strong Foundations.
              <span> Wider Possibilities.</span>
            </h3>

            <div className="abpsAboutIntroPremiumLine"></div>

            <p className="abpsAboutIntroPremiumLead">
              Our approach brings together academic learning,
              creativity, communication, sports, arts, technology
              and leadership.
            </p>

            <p className="abpsAboutIntroPremiumText">
              Every learner is given opportunities to participate,
              collaborate and take responsibility. With experienced
              teachers and a caring school community, students are
              encouraged to become independent thinkers and lifelong
              learners.
            </p>

            {/* FEATURES */}
            <div className="abpsAboutIntroPremiumFeatures">

              {features.map((feature, index) => (
                <div
                  className="abpsAboutIntroPremiumFeature"
                  key={feature.title}
                >
                  <div className="abpsAboutIntroPremiumFeatureTop">

                    <div className="abpsAboutIntroPremiumIcon">
                      {feature.icon}
                    </div>

                    <span>
                      0{index + 1}
                    </span>

                  </div>

                  <h4>{feature.title}</h4>

                  <p>{feature.text}</p>
                </div>
              ))}

            </div>

            {/* BUTTON */}
            <Link
              to="/academics"
              className="abpsAboutIntroPremiumButton"
            >
              <span>Explore Our Academics</span>
              <FaArrowRight />
            </Link>

          </div>

        </div>

        {/* STATS */}
        <div className="abpsAboutIntroPremiumStats">

          <div className="abpsAboutIntroPremiumStat">
            <strong>25+</strong>
            <span>Years of Excellence</span>
          </div>

          <div className="abpsAboutIntroPremiumStat">
            <strong>1500+</strong>
            <span>Students</span>
          </div>

          <div className="abpsAboutIntroPremiumStat">
            <strong>100+</strong>
            <span>Teachers</span>
          </div>

          <div className="abpsAboutIntroPremiumStat">
            <strong>30+</strong>
            <span>Activities</span>
          </div>

        </div>

      </div>
    </section>
  );
};

export default AboutIntro;