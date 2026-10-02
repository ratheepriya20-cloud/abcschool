import React from "react";
import {
  FaLightbulb,
  FaHeart,
  FaGlobe,
} from "react-icons/fa";
import "./AboutValues.css";

const AboutValues = () => {
  const values = [
    {
      number: "01",
      icon: <FaLightbulb />,
      title: "Curiosity",
      text: "We encourage students to question, explore and develop a genuine love for learning.",
    },
    {
      number: "02",
      icon: <FaHeart />,
      title: "Character",
      text: "We nurture kindness, confidence, discipline, empathy and integrity alongside growth.",
    },
    {
      number: "03",
      icon: <FaGlobe />,
      title: "Perspective",
      text: "We help students understand the world and participate with confidence and purpose.",
    },
  ];

  return (
    <section className="abpsValuesCompact">
      <div className="abpsValuesCompactContainer">

        {/* HEADING */}
        <div className="abpsValuesCompactHeader">

          <div className="abpsValuesCompactLabel">
            <span></span>
            WHAT GUIDES US
            <span></span>
          </div>

          <h2>
            Values Behind
            <em> Every Experience.</em>
          </h2>

          <p>
            Our values shape the way we teach, learn, communicate and grow
            together as a school community.
          </p>

        </div>

        {/* CARDS */}
        <div className="abpsValuesCompactGrid">

          {values.map((item) => (
            <article
              className="abpsValuesCompactCard"
              key={item.number}
            >

              <div className="abpsValuesCompactTop">
                <span className="abpsValuesCompactNumber">
                  {item.number}
                </span>

                <div className="abpsValuesCompactIcon">
                  {item.icon}
                </div>
              </div>

              <div className="abpsValuesCompactContent">
                <span className="abpsValuesCompactSmall">
                  OUR VALUE
                </span>

                <h3>{item.title}</h3>

                <div className="abpsValuesCompactLine"></div>

                <p>{item.text}</p>
              </div>

            </article>
          ))}

        </div>

      </div>
    </section>
  );
};

export default AboutValues;