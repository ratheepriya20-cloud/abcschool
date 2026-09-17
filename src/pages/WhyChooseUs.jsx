import React from "react";
import { useNavigate } from "react-router-dom";
import "./WhyChooseUs.css";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";

const reasons = [
  {
    number: "01",
    title: "Academic Excellence",
    text: "A strong academic foundation supported by experienced teachers and engaging learning methods."
  },
  {
    number: "02",
    title: "Holistic Development",
    text: "We focus on academics, sports, creativity, communication, leadership and personal growth."
  },
  {
    number: "03",
    title: "Experienced Teachers",
    text: "Our educators understand individual learning needs and encourage students to reach their potential."
  },
  {
    number: "04",
    title: "Safe & Caring Environment",
    text: "A welcoming school community where students feel respected, supported and confident."
  },
  {
    number: "05",
    title: "Modern Learning",
    text: "Technology, activities and innovative teaching approaches make learning meaningful and engaging."
  },
  {
    number: "06",
    title: "Strong Community",
    text: "We build lasting partnerships between students, parents, teachers and the wider community."
  }
];

const WhyChooseUs = () => {
  const navigate = useNavigate();

  return (
    <>
    <Navbar />
    <div className="wcuPage">

      {/* HERO */}
      <section className="wcuHero">

        <div className="wcuHeroContent">

          <span className="wcuHeroEyebrow">
            WHY CHOOSE OUR SCHOOL
          </span>

          <h1>
            More Than A School.
            <span>A Place To Belong.</span>
          </h1>

          <p>
            Discover an educational experience designed to help students
            learn confidently, grow personally and prepare for a successful future.
          </p>

          <div className="wcuHeroLine"></div>

        </div>

      </section>


      {/* INTRO */}
      <section className="wcuMain">

        <div className="wcuIntro">

          <div>
            <span>THE DIFFERENCE WE MAKE</span>

            <h2>
              Why Families
              <strong>Choose Us.</strong>
            </h2>
          </div>


        </div>


        {/* REASONS */}
        <div className="wcuReasons">

          {reasons.map((reason) => (
            <article className="wcuReasonCard" key={reason.number}>

              <div className="wcuReasonNumber">
                {reason.number}
              </div>

              <div className="wcuReasonContent">

                <h3>{reason.title}</h3>

                <p>{reason.text}</p>

              </div>

              <div className="wcuReasonArrow">
                →
              </div>

            </article>
          ))}

        </div>


        {/* HIGHLIGHT */}
        <section className="wcuHighlight">

          <div className="wcuHighlightBadge">
            <span>★</span>
            SCHOOL COMMUNITY
          </div>

          <h2>
            Where every student gets
            <strong>the opportunity to shine.</strong>
          </h2>

          <p>
            From the classroom to the playground, from first friendships
            to major achievements, we create experiences that students
            remember long after they leave school.
          </p>

          <div className="wcuHighlightStats">

            <div>
              <strong>1500+</strong>
              <span>Students</span>
            </div>

            <div>
              <strong>100+</strong>
              <span>Teachers</span>
            </div>

            <div>
              <strong>25+</strong>
              <span>Years</span>
            </div>

            <div>
              <strong>98%</strong>
              <span>Board Results</span>
            </div>

          </div>

        </section>


        {/* CTA */}
        <div className="wcuCTA">

          <div>
            <span>YOUR CHILD'S JOURNEY STARTS HERE</span>

            <h3>
              Give them a place
              <strong>to learn and thrive.</strong>
            </h3>
          </div>

          <button onClick={() => navigate("/admission")}>
            Explore Admissions
            <span>→</span>
          </button>

        </div>

      </section>

    </div>
<Footer />
    </>
  );
};

export default WhyChooseUs;