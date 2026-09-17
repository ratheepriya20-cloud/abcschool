import React, { useState } from "react";
import "./GalleryPage.css";

import gallery1 from "../assets/student-activity.jpg";
import gallery2 from "../assets/school-campus.jpg";
import gallery3 from "../assets/school-hero-3.jpg";
import gallery4 from "../assets/student-art.jpg";
import gallery5 from "../assets/student-cultural.jpg";
import gallery6 from "../assets/student-sports.jpg";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";

const galleryImages = [
  {
    id: 1,
    title: "Student Activities",
    category: "Activities",
    image: gallery1,
  },
  {
    id: 2,
    title: "Our School Campus",
    category: "Campus",
    image: gallery2,
  },
  {
    id: 3,
    title: "School Life",
    category: "Events",
    image: gallery3,
  },
  {
    id: 4,
    title: "Art & Creativity",
    category: "Activities",
    image: gallery4,
  },
  {
    id: 5,
    title: "Cultural Celebration",
    category: "Events",
    image: gallery5,
  },
  {
    id: 6,
    title: "Sports & Fitness",
    category: "Sports",
    image: gallery6,
  },
];

const categories = [
  "All",
  "Activities",
  "Campus",
  "Events",
  "Sports",
];

const GalleryPage = () => {
  const [activeCategory, setActiveCategory] = useState("All");
  const [selectedImage, setSelectedImage] = useState(null);

  const filteredImages =
    activeCategory === "All"
      ? galleryImages
      : galleryImages.filter(
          (item) => item.category === activeCategory
        );

  return (
    <>
    <Navbar />
    <main className="schoolGalleryPage">

    <section className="galleryPageHero">

  <div className="galleryPageHeroContent">

    <div className="galleryPageEyebrow">
      <span className="eyebrowLine"></span>

      <span className="eyebrowText">
        LIFE AT OUR SCHOOL
      </span>

      <span className="eyebrowLine"></span>
    </div>

    <h1>
      Moments That <span>Make Us Proud.</span>
    </h1>

    <p>
      Explore the memorable moments, achievements,
      celebrations and everyday experiences that make
      our school community special.
    </p>

    <div className="galleryHeroLine"></div>

  </div>

</section>


      {/* GALLERY */}
      <section className="galleryPageSection">

        <div className="galleryPageContainer">

          <div className="galleryPageHeader">

            <div>
              <span className="galleryPageLabel">
                OUR MEMORIES
              </span>

              <h2>
                Explore Our{" "}
                <span>School Life.</span>
              </h2>
            </div>

            <p>
              A glimpse into classrooms, sports, celebrations,
              activities and unforgettable school memories.
            </p>

          </div>


          {/* FILTERS */}
          <div className="galleryFilters">

            {categories.map((category) => (
              <button
                key={category}
                className={
                  activeCategory === category
                    ? "galleryFilter active"
                    : "galleryFilter"
                }
                onClick={() => setActiveCategory(category)}
              >
                {category}
              </button>
            ))}

          </div>


          {/* CARDS */}
          <div className="galleryPageGrid">

            {filteredImages.map((item) => (
              <article
                className="galleryPageCard"
                key={item.id}
                onClick={() => setSelectedImage(item)}
              >

                <div className="galleryPageImage">

                  <img
                    src={item.image}
                    alt={item.title}
                  />

                  <div className="galleryImageOverlay">

                    <span className="galleryCategory">
                      {item.category}
                    </span>

                    <div className="galleryImageInfo">

                      <h3>{item.title}</h3>

                      <span className="galleryView">
                        View Photo →
                      </span>

                    </div>

                  </div>

                </div>

              </article>
            ))}

          </div>

        </div>

      </section>


      {/* LIGHTBOX */}
      {selectedImage && (
        <div
          className="galleryLightbox"
          onClick={() => setSelectedImage(null)}
        >

          <button
            className="galleryClose"
            onClick={() => setSelectedImage(null)}
          >
            ×
          </button>

          <div
            className="galleryLightboxContent"
            onClick={(e) => e.stopPropagation()}
          >

            <img
              src={selectedImage.image}
              alt={selectedImage.title}
            />

            <div className="galleryLightboxInfo">

              <span>
                {selectedImage.category}
              </span>

              <h3>
                {selectedImage.title}
              </h3>

            </div>

          </div>

        </div>
      )}

    </main>
    <Footer />
    </>
  );
};

export default GalleryPage;