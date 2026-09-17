import React from "react";
import { useNavigate } from "react-router-dom";
import "./QuickInfo.css";

const QuickInfo = () => {
  const navigate = useNavigate();

  const cards = [
    {
      number: "01",
      title: "Admissions Open",
      text: "Apply for 2026–27",
      button: "Apply Now",
      path: "/admission",
      icon: "🎓",
    },
    {
      number: "02",
      title: "Academic Excellence",
      text: "Learn. Grow. Achieve.",
      button: "Explore",
      path: "/academics",
      icon: "📚",
    },
    {
      number: "03",
      title: "Expert Faculty",
      text: "Experienced & Caring Teachers",
      button: "Meet Faculty",
      path: "/faculty",
      icon: "👩‍🏫",
    },
    {
      number: "04",
      title: "Modern Campus",
      text: "Safe & Smart Learning Spaces",
      button: "View Campus",
      path: "/facilities",
      icon: "🏫",
    },
  ];

  return (
    <section className="quickInfoSection">
      <div className="quickInfoContainer">

        {cards.map((card) => (
          <div className="quickInfoCard" key={card.number}>

            <div className="quickCardTop">
              <span className="quickCardNumber">
                {card.number}
              </span>

              <span className="quickCardIcon">
                {card.icon}
              </span>
            </div>

            <div className="quickCardContent">
              <h3>{card.title}</h3>
              <p>{card.text}</p>
            </div>

            <button
              className="quickCardButton"
              onClick={() => navigate(card.path)}
            >
              {card.button}
              <span>→</span>
            </button>

          </div>
        ))}

      </div>
    </section>
  );
};

export default QuickInfo;