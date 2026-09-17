import React from "react";
import { useNavigate } from "react-router-dom";
import "./VisionMission.css";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";

const VisionMission = () => {
  const navigate = useNavigate();

  return (
    <>
    <Navbar />
    <div className="vmPage">

      {/* HERO */}
      <section className="vmHero">
        <div className="vmHeroInner">

          <span className="vmHeroEyebrow">
            OUR PURPOSE & DIRECTION
          </span>

          <h1>
            Inspiring Minds.
            <span>Shaping Futures.</span>
          </h1>

          <p>
            Our vision and mission guide everything we do —
            from classroom learning to character building,
            leadership and community development.
          </p>

          <div className="vmHeroDivider"></div>

        </div>
      </section>


      {/* VISION + MISSION */}
      <section className="vmMain">

        <div className="vmIntro">
          <span>WHAT DRIVES US</span>

          <h2>
            A Purpose Beyond
            <strong>Classroom Learning.</strong>
          </h2>

          <p>
            We believe education is not simply about academic success.
            It is about developing confident, responsible and compassionate
            individuals who are prepared to make a meaningful difference.
          </p>
        </div>


        <div className="vmCards">

          {/* VISION */}
          <article className="vmCard vmVisionCard">

            <div className="vmCardNumber">01</div>

            <div className="vmCardIcon">◉</div>

            <span className="vmCardLabel">
              OUR VISION
            </span>

            <h3>
              Building a Better
              <em>Tomorrow.</em>
            </h3>

            <p>
              To create a nurturing and inspiring educational environment
              where every student discovers their potential, develops
              confidence and becomes a responsible global citizen.
            </p>

            <div className="vmCardLine"></div>

            <strong className="vmCardBottom">
              Dream • Discover • Achieve
            </strong>

          </article>


          {/* MISSION */}
          <article className="vmCard vmMissionCard">

            <div className="vmCardNumber">02</div>

            <div className="vmCardIcon">✦</div>

            <span className="vmCardLabel">
              OUR MISSION
            </span>

            <h3>
              Learning With
              <em>Purpose.</em>
            </h3>

            <p>
              To provide quality education that combines strong academics,
              creativity, technology, sports and values while encouraging
              curiosity, critical thinking and lifelong learning.
            </p>

            <div className="vmCardLine"></div>

            <strong className="vmCardBottom">
              Learn • Lead • Inspire
            </strong>

          </article>

        </div>


        {/* VALUES */}
        <div className="vmValues">

          <div className="vmValuesHeading">
            <span>OUR CORE VALUES</span>
            <h2>Values That Shape Every <strong>Student.</strong></h2>
          </div>

          <div className="vmValuesGrid">

            <div className="vmValueItem">
              <b>01</b>
              <h3>Integrity</h3>
              <p>Doing what is right with honesty and responsibility.</p>
            </div>

            <div className="vmValueItem">
              <b>02</b>
              <h3>Excellence</h3>
              <p>Encouraging every student to give their very best.</p>
            </div>

            <div className="vmValueItem">
              <b>03</b>
              <h3>Respect</h3>
              <p>Creating a community where everyone is valued.</p>
            </div>

            <div className="vmValueItem">
              <b>04</b>
              <h3>Innovation</h3>
              <p>Preparing learners to think creatively and confidently.</p>
            </div>

          </div>
        </div>


        {/* CTA */}
        <div className="vmCTA">
          <div>
            <span>READY TO DISCOVER MORE?</span>
            <h3>
              See what makes our school
              <strong>different.</strong>
            </h3>
          </div>

          <button onClick={() => navigate("/why-us")}>
            Why Choose Us
            <span>→</span>
          </button>
        </div>

      </section>

    </div>
<Footer />
    </>
  );
};

export default VisionMission;