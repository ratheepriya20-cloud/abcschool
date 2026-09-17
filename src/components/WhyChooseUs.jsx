import React from "react";
import { useNavigate } from "react-router-dom";
import "./WhyChooseUs.css";

import schoolImage from "../assets/school-campus.jpg";

const WhyChooseUs = () => {
  const navigate = useNavigate();

  const features = [
    {
      number: "01",
      title: "Academic Excellence",
      text: "Strong academics with modern teaching methods and focused learning.",
    },
    {
      number: "02",
      title: "Experienced Faculty",
      text: "Dedicated teachers who guide, support and inspire every student.",
    },
    {
      number: "03",
      title: "Modern Learning",
      text: "Smart classrooms, technology and practical learning experiences.",
    },
    {
      number: "04",
      title: "Holistic Development",
      text: "Sports, creativity, leadership and activities beyond academics.",
    },
    {
      number: "05",
      title: "Safe & Caring Campus",
      text: "A secure, positive and welcoming environment for every child.",
    },
  ];

  return (
    <section className="whySchoolSection">

      <div className="whySchoolContainer">

        {/* LEFT CONTENT */}
        <div className="whySchoolContent">

          <span className="whySchoolLabel">
            WHY CHOOSE US
          </span>

          <h2>
            Education That
            <span>Builds Tomorrow.</span>
          </h2>

          <p className="whySchoolIntro">
            We believe every child has unique potential. Our approach
            combines academic excellence, modern learning and strong
            values to help students become confident future leaders.
          </p>


          <div className="whyFeatures">

            {features.map((feature) => (
              <div className="whyFeature" key={feature.number}>

                <div className="whyFeatureNumber">
                  {feature.number}
                </div>

                <div className="whyFeatureText">
                  <h3>{feature.title}</h3>
                  <p>{feature.text}</p>
                </div>

                <span className="whyFeatureArrow">→</span>

              </div>
            ))}

          </div>


          {/* WORKING CTA */}
          <button
            className="whySchoolButton"
            onClick={() => navigate("/academics")}
          >
            Explore Our Academics
            <span>→</span>
          </button>

        </div>


        {/* RIGHT IMAGE */}
        <div className="whySchoolVisual">

          <div className="whyImageGlow"></div>

          <div className="whyImageFrame">

            <img
              src={schoolImage}
              alt="Shiksha Bharti Vidyalaya campus"
            />

            <div className="whyImageOverlay"></div>

          </div>


          {/* FLOATING CARD */}
          <div className="whyAchievementCard">

            <div className="whyAchievementIcon">
              ★
            </div>

            <div>
              <strong>98%</strong>
              <span>Board Results</span>
            </div>

          </div>


          {/* GOLD DECORATION */}
          <div className="whyGoldCircle"></div>

        </div>

      </div>

    </section>
  );
};

export default WhyChooseUs;