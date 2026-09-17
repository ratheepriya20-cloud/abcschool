import React from "react";
import { useNavigate } from "react-router-dom";
import "./OurLeadership.css";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";

const leaders = [
  {
    name: "Dr. Anil Sharma",
    role: "Principal",
    initials: "AS",
    text: "Leading with vision, compassion and a strong commitment to academic excellence."
  },
  {
    name: "Mrs. Meera Kapoor",
    role: "Vice Principal",
    initials: "MK",
    text: "Creating an inclusive learning environment where every student feels valued."
  },
  {
    name: "Mr. Rajiv Malhotra",
    role: "Academic Director",
    initials: "RM",
    text: "Driving innovative teaching practices and meaningful learning experiences."
  }
];

const OurLeadership = () => {
  const navigate = useNavigate();

  return (
    <>
    <Navbar />
    <div className="olPage">

      {/* HERO */}
      <section className="olHero">
        <div className="olHeroContent">

          <span className="olHeroEyebrow">
            OUR LEADERSHIP
          </span>

          <h1>
            People Who
            <span>Lead With Purpose.</span>
          </h1>

          <p>
            Meet the dedicated leaders who guide our school community
            with experience, vision and a commitment to every student's success.
          </p>

          <div className="olHeroRule"></div>

        </div>
      </section>


      {/* INTRO */}
      <section className="olMain">

        <div className="olIntro">

          <div>
            <span>LEADERSHIP AT OUR SCHOOL</span>
            <h2>
              Guiding Today's Learners
              <strong>Towards Tomorrow.</strong>
            </h2>
          </div>

          <p>
            Great schools are built by people who believe in their students.
            Our leadership team works closely with teachers, students and
            families to create an environment where learning and personal
            growth go hand in hand.
          </p>

        </div>


        {/* LEADER CARDS */}
        <div className="olLeaderGrid">

          {leaders.map((leader, index) => (
            <article
              className={`olLeaderCard ${
                index === 0 ? "olLeaderFeatured" : ""
              }`}
              key={leader.name}
            >



              <div className="olLeaderAvatar">
                {leader.initials}
              </div>

              <span className="olLeaderRole">
                {leader.role}
              </span>

              <h3>{leader.name}</h3>

              <p>{leader.text}</p>

              <div className="olLeaderBottom">
                <span>Leadership Team</span>
               
              </div>

            </article>
          ))}

        </div>


        {/* LEADERSHIP PHILOSOPHY */}
        <section className="olPhilosophy">

          <div className="olPhilosophyContent">

            <span>OUR LEADERSHIP PHILOSOPHY</span>

            <h2>
              Lead By Example.
              <strong>Inspire By Action.</strong>
            </h2>

            <p>
              We believe effective leadership begins with listening,
              understanding and empowering others. Our leaders work
              collaboratively with educators and families to ensure
              every child receives the support and opportunities they need.
            </p>

          </div>

          <div className="olPhilosophyStats">

            <div>
              <strong>25+</strong>
              <span>Years of Educational Experience</span>
            </div>

            <div>
              <strong>100+</strong>
              <span>Dedicated Educators</span>
            </div>

            <div>
              <strong>1500+</strong>
              <span>Students Guided</span>
            </div>

          </div>

        </section>


        {/* CTA */}
        <div className="olCTA">
          <div>
            <span>DISCOVER OUR COMMUNITY</span>
            <h3>See why families choose <strong>our school.</strong></h3>
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

export default OurLeadership;