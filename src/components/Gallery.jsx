import React from "react";
import { useNavigate } from "react-router-dom";
import "./Gallery.css";

import gallery1 from "../assets/student-activity.jpg";
import gallery2 from "../assets/school-campus.jpg";
import gallery3 from "../assets/school-hero-3.jpg";
import gallery4 from "../assets/student-art.jpg";
import gallery5 from "../assets/student-cultural.jpg";
import gallery6 from "../assets/student-sports.jpg";

const galleryData = [
  {
    image: gallery1,
    title: "School Campus",
    category: "Campus",
  },
  {
    image: gallery2,
    title: "Sports Activities",
    category: "Sports",
  },
  {
    image: gallery3,
    title: "Annual Function",
    category: "Events",
  },
  {
    image: gallery4,
    title: "Student Activities",
    category: "Activities",
  },
  {
    image: gallery5,
    title: "Cultural Programme",
    category: "Cultural",
  },
  {
    image: gallery6,
    title: "Learning Moments",
    category: "Academics",
  },
];

const Gallery = () => {
  const navigate = useNavigate();

  return (
    <section className="schoolGallery">

      <div className="galleryContainer">

        {/* HEADER */}
        <div className="galleryHeader">

          <div>
            <span className="galleryLabel">
              LIFE AT OUR SCHOOL
            </span>

            <h2>
              Moments That
              <span>Make Us Proud.</span>
            </h2>
          </div>

          <div className="galleryHeaderRight">

            <p>
              Explore memorable moments, celebrations,
              activities and achievements from our school campus.
            </p>

            <button
              onClick={() => navigate("/gallery")}
            >
              View Full Gallery
              <span>↗</span>
            </button>

          </div>

        </div>


        {/* GALLERY GRID */}
        <div className="schoolGalleryGrid">

          {galleryData.map((item, index) => (
            <div
              className={`schoolGalleryItem galleryItem${index + 1}`}
              key={item.title}
              onClick={() => navigate("/gallery")}
            >

              <img
                src={item.image}
                alt={item.title}
              />

              <div className="galleryDarkOverlay"></div>

              <div className="galleryInfo">

                <div>
                  <span>
                    {item.category}
                  </span>

                  <h3>
                    {item.title}
                  </h3>
                </div>

                <div className="galleryArrow">
                  ↗
                </div>

              </div>

            </div>
          ))}

        </div>


        {/* BOTTOM CTA */}
        <div className="galleryBottom">

          <div className="galleryBottomText">

            <span>
              DISCOVER MORE
            </span>

            <strong>
              See the vibrant life of our students.
            </strong>

          </div>

          <button
            onClick={() => navigate("/gallery")}
          >
            Explore Gallery
            <span>→</span>
          </button>

        </div>

      </div>

    </section>
  );
};

export default Gallery;