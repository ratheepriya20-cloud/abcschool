import React, { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";

import {
  FaArrowRight,
  FaCamera,
  FaImages,
  FaTimes,
  FaChevronLeft,
  FaChevronRight,
  FaExpandAlt,
} from "react-icons/fa";

import "./Gallery.css";


import sports1 from "../assets/sports-gallery-1.jpg";
import sports2 from "../assets/sports-gallery-2.jpg";
import sports3 from "../assets/sports-gallery-3.jpg";
import sports4 from "../assets/sports-gallery-4.jpg";
import sports5 from "../assets/facility-badminton.jpg";
import sports6 from "../assets/sports-indoor.jpg";

// CULTURAL
import cultural1 from "../assets/cultural-gallery-1.jpg";
import cultural2 from "../assets/cultural-dance.jpg";
import cultural3 from "../assets/cultural-art.jpg";
import cultural4 from "../assets/cultural-literary.jpg";
import cultural5 from "../assets/cultural-club.jpg";
import cultural6 from "../assets/cultural-music.jpg";

// EDUCATIONAL TRIPS
import trip1 from "../assets/trip-gallery-1.jpg";
import trip2 from "../assets/trip-gallery-2.jpg";
import trip3 from "../assets/trip-gallery-3.jpg";
import trip4 from "../assets/science-trips.jpg";
import trip5 from "../assets/historical-trips.jpg";
import trip6 from "../assets/nature-trips.jpg";

// FACILITIES
import facility1 from "../assets/school-facilities.jpg";
import facility2 from "../assets/facility-classroom.jpg";
import facility3 from "../assets/facility-library.jpg";
import facility4 from "../assets/science-learning.jpg";
import facility5 from "../assets/technology-learning.jpg";
import facility6 from "../assets/facility-cta.jpg";



const galleryItems = [
  {
    id: 1,
    image: sports1,
    title: "Football Excellence",
    category: "Sports",
  },
  {
    id: 2,
    image: cultural1,
    title: "Cultural Celebration",
    category: "Cultural",
  },
  {
    id: 3,
    image: trip1,
    title: "Learning Beyond Classrooms",
    category: "Trips",
  },
  {
    id: 4,
    image: facility1,
    title: "Our Modern Campus",
    category: "Facilities",
  },

  {
    id: 5,
    image: sports2,
    title: "Cricket Moments",
    category: "Sports",
  },
  {
    id: 6,
    image: cultural2,
    title: "Dance Performance",
    category: "Cultural",
  },
  {
    id: 7,
    image: trip2,
    title: "Educational Journey",
    category: "Trips",
  },
  {
    id: 8,
    image: facility2,
    title: "Smart Classrooms",
    category: "Facilities",
  },

  {
    id: 9,
    image: sports3,
    title: "Basketball Action",
    category: "Sports",
  },
  {
    id: 10,
    image: cultural3,
    title: "Creative Art",
    category: "Cultural",
  },
  {
    id: 11,
    image: trip3,
    title: "Exploring Together",
    category: "Trips",
  },
  {
    id: 12,
    image: facility3,
    title: "Modern Library",
    category: "Facilities",
  },

  {
    id: 13,
    image: sports4,
    title: "Athletics",
    category: "Sports",
  },
  {
    id: 14,
    image: cultural4,
    title: "Literary Activities",
    category: "Cultural",
  },
  {
    id: 15,
    image: trip4,
    title: "Science Discovery",
    category: "Trips",
  },
  {
    id: 16,
    image: facility4,
    title: "Science Laboratory",
    category: "Facilities",
  },

  {
    id: 17,
    image: sports5,
    title: "Badminton",
    category: "Sports",
  },
  {
    id: 18,
    image: cultural5,
    title: "Student Clubs",
    category: "Cultural",
  },
  {
    id: 19,
    image: trip5,
    title: "History & Heritage",
    category: "Trips",
  },
  {
    id: 20,
    image: facility5,
    title: "Technology Learning",
    category: "Facilities",
  },

  {
    id: 21,
    image: sports6,
    title: "Indoor Games",
    category: "Sports",
  },
  {
    id: 22,
    image: cultural6,
    title: "Music & Rhythm",
    category: "Cultural",
  },
  {
    id: 23,
    image: trip6,
    title: "Nature Exploration",
    category: "Trips",
  },
  {
    id: 24,
    image: facility6,
    title: "Campus Life",
    category: "Facilities",
  },
];

const categories = [
  "All",
  "Sports",
  "Cultural",
  "Trips",
  "Facilities",
];


/* =========================================================
   COMPONENT
========================================================= */

const Gallery = () => {
  const navigate = useNavigate();

  const [activeCategory, setActiveCategory] = useState("All");
  const [selectedIndex, setSelectedIndex] = useState(null);

  const filteredGallery = useMemo(() => {
    if (activeCategory === "All") {
      return galleryItems;
    }

    return galleryItems.filter(
      (item) => item.category === activeCategory
    );
  }, [activeCategory]);


  const openImage = (index) => {
    setSelectedIndex(index);
    document.body.style.overflow = "hidden";
  };


  const closeImage = () => {
    setSelectedIndex(null);
    document.body.style.overflow = "";
  };


  const previousImage = () => {
    setSelectedIndex((current) =>
      current === 0
        ? filteredGallery.length - 1
        : current - 1
    );
  };


  const nextImage = () => {
    setSelectedIndex((current) =>
      current === filteredGallery.length - 1
        ? 0
        : current + 1
    );
  };


  const changeCategory = (category) => {
    setActiveCategory(category);
    setSelectedIndex(null);
  };


  const selectedImage =
    selectedIndex !== null
      ? filteredGallery[selectedIndex]
      : null;


  return (
    <main className="abgallery-page">

      {/* =====================================================
          HERO
      ===================================================== */}

      <section className="abgallery-hero">

        <div className="abgallery-hero-pattern" />

        <div className="abgallery-container abgallery-hero-grid">

          <div className="abgallery-hero-content">

            <div className="abgallery-breadcrumb">
              <button onClick={() => navigate("/")}>
                Home
              </button>

              <span>›</span>

              <button onClick={() => navigate("/campus-life")}>
                Campus Life
              </button>

              <span>›</span>

              <strong>Gallery</strong>
            </div>


            <span className="abgallery-label">
              <FaCamera />
              SCHOOL GALLERY
            </span>


            <h1>
              Moments That Tell
              <span> Our Story.</span>
            </h1>


            <p>
              Explore memorable moments from academics, sports,
              cultural activities, educational trips and everyday
              school life at AB Public School.
            </p>


            <button
              className="abgallery-primary-btn"
              onClick={() =>
                document
                  .getElementById("schoolGallery")
                  ?.scrollIntoView({
                    behavior: "smooth",
                  })
              }
            >
              Explore Gallery
              <FaArrowRight />
            </button>

          </div>


          {/* HERO IMAGE COMPOSITION */}

          <div className="abgallery-hero-visual">

            <div className="abgallery-hero-photo hero-photo-main">
              <img src={sports1} alt="AB Public School life" />
            </div>

            <div className="abgallery-hero-photo hero-photo-small-one">
              <img src={cultural2} alt="School cultural activity" />
            </div>

            <div className="abgallery-hero-photo hero-photo-small-two">
              <img src={trip1} alt="School educational trip" />
            </div>


            <div className="abgallery-hero-badge">
              <FaImages />

              <div>
                <strong>Life at ABPS</strong>
                <span>Captured in Moments</span>
              </div>
            </div>

          </div>

        </div>

        <div className="abgallery-hero-bottom" />

      </section>


      {/* =====================================================
          GALLERY
      ===================================================== */}

      <section
        className="abgallery-main"
        id="schoolGallery"
      >

        <div className="abgallery-container">

          <div className="abgallery-heading">

            <span className="abgallery-small-label">
              EXPLORE OUR MOMENTS
            </span>

            <h2>
              Life At Our
              <span> School.</span>
            </h2>

            <p>
              Every photograph captures a story of learning,
              friendship, creativity, achievement and discovery.
            </p>

          </div>


          {/* FILTER */}

          <div className="abgallery-filters">

            {categories.map((category) => (
              <button
                key={category}
                className={
                  activeCategory === category
                    ? "active"
                    : ""
                }
                onClick={() =>
                  changeCategory(category)
                }
              >
                {category}
              </button>
            ))}

          </div>


          {/* =================================================
              AUTO BENTO GRID

              Important:
              nth-child pattern repeat hota rahega.
              Isliye jitni images add karoge design same rahega.
          ================================================= */}

          <div className="abgallery-bento-grid">

            {filteredGallery.map((item, index) => (

              <article
                className="abgallery-card"
                key={item.id}
                onClick={() => openImage(index)}
              >

                <img
                  src={item.image}
                  alt={item.title}
                  loading="lazy"
                />


                <div className="abgallery-card-shade" />


                <span className="abgallery-category">
                  {item.category}
                </span>


                <div className="abgallery-card-content">

                  <div>
                    <h3>{item.title}</h3>

                    <p>
                      AB Public School
                    </p>
                  </div>


                  <span className="abgallery-expand">
                    <FaExpandAlt />
                  </span>

                </div>

              </article>

            ))}

          </div>

        </div>

      </section>


      {/* =====================================================
          BOTTOM STRIP
      ===================================================== */}

      <section className="abgallery-bottom-section">

        <div className="abgallery-container abgallery-bottom-inner">

          <div>
            <span>MORE THAN PHOTOGRAPHS</span>

            <h2>
              Memories That
              <strong> Last Forever.</strong>
            </h2>

            <p>
              Every day at AB Public School brings new
              opportunities to learn, explore and create
              unforgettable memories.
            </p>
          </div>


          <button onClick={() => navigate("/contact")}>
            Visit Our Campus
            <FaArrowRight />
          </button>

        </div>

      </section>


      {/* =====================================================
          LIGHTBOX
      ===================================================== */}

      {selectedImage && (

        <div
          className="abgallery-lightbox"
          onClick={closeImage}
        >

          <button
            className="abgallery-close"
            onClick={closeImage}
            aria-label="Close image"
          >
            <FaTimes />
          </button>


          <button
            className="abgallery-lightbox-arrow previous"
            onClick={(event) => {
              event.stopPropagation();
              previousImage();
            }}
            aria-label="Previous image"
          >
            <FaChevronLeft />
          </button>


          <div
            className="abgallery-lightbox-content"
            onClick={(event) =>
              event.stopPropagation()
            }
          >

            <img
              src={selectedImage.image}
              alt={selectedImage.title}
            />


            <div className="abgallery-lightbox-info">

              <span>
                {selectedImage.category}
              </span>

              <h3>
                {selectedImage.title}
              </h3>

              <p>
                {selectedIndex + 1} / {filteredGallery.length}
              </p>

            </div>

          </div>


          <button
            className="abgallery-lightbox-arrow next"
            onClick={(event) => {
              event.stopPropagation();
              nextImage();
            }}
            aria-label="Next image"
          >
            <FaChevronRight />
          </button>

        </div>

      )}

    </main>
  );
};

export default Gallery;