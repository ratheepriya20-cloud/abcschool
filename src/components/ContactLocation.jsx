import React from "react";

import {
  FaMapMarkerAlt,
  FaPhoneAlt,
  FaClock,
  FaDirections,
  FaSchool,
  FaArrowRight,
} from "react-icons/fa";

import "./ContactLocation.css";

const ContactLocation = () => {
  const schoolAddress =
    "Jagdish Colony, Ramnagar, Rohtak, Haryana";

  const openDirections = () => {
    const mapUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
      schoolAddress
    )}`;

    window.open(
      mapUrl,
      "_blank",
      "noopener,noreferrer"
    );
  };

  const callSchool = () => {
    window.location.href =
      "tel:+919999123456";
  };

  return (
    <section className="abLocation">

      <div className="abLocationShape shapeOne"></div>
      <div className="abLocationShape shapeTwo"></div>

      <div className="abLocationContainer">

        {/* =========================================
            HEADING
        ========================================= */}

        <div className="abLocationHeading">

          <div className="abLocationLabel">
            <span>VISIT OUR CAMPUS</span>
            <i></i>
          </div>

          <h2>
            Find Your Way To{" "}
            <span>AB Public School</span>
          </h2>

          <p>
            Planning a campus visit? Use the map
            below to find our school location and
            get directions directly from Google Maps.
          </p>

        </div>


        {/* =========================================
            MAIN LOCATION AREA
        ========================================= */}

        <div className="abLocationGrid">

          {/* =====================================
              LEFT INFORMATION
          ===================================== */}

          <div className="abLocationInfo">

            <div className="abLocationSchoolBadge">

              <div className="abLocationSchoolIcon">
                <FaSchool />
              </div>

              <div>
                <span>AB PUBLIC SCHOOL</span>

                <strong>
                  Welcome To Our Campus
                </strong>
              </div>

            </div>


            {/* ADDRESS */}

            <div className="abLocationInfoCard">

              <div className="abLocationInfoIcon gold">
                <FaMapMarkerAlt />
              </div>

              <div className="abLocationInfoContent">

                <span>SCHOOL ADDRESS</span>

                <h3>
                  Visit Our Campus
                </h3>

                <p>
                  Jagdish Colony, Ramnagar,
                  <br />
                  Rohtak, Haryana
                </p>

              </div>

            </div>


            {/* CALL */}

            <button
              type="button"
              className="abLocationInfoCard clickable"
              onClick={callSchool}
            >

              <div className="abLocationInfoIcon navy">
                <FaPhoneAlt />
              </div>

              <div className="abLocationInfoContent">

                <span>NEED HELP FINDING US?</span>

                <h3>
                  Call School Office
                </h3>

                <p>
                  +91 99991 23456
                </p>

              </div>

              <div className="abLocationArrow">
                <FaArrowRight />
              </div>

            </button>


            {/* HOURS */}

            <div className="abLocationInfoCard">

              <div className="abLocationInfoIcon blue">
                <FaClock />
              </div>

              <div className="abLocationInfoContent">

                <span>VISITING HOURS</span>

                <h3>
                  Monday - Saturday
                </h3>

                <p>
                  8:00 AM - 4:00 PM
                </p>

              </div>

            </div>


            {/* DIRECTIONS BUTTON */}

            <button
              type="button"
              className="abLocationDirectionsBtn"
              onClick={openDirections}
            >

              <FaDirections />

              <span>
                Get Directions
              </span>

              <FaArrowRight />

            </button>

          </div>


          {/* =====================================
              RIGHT GOOGLE MAP
          ===================================== */}

          <div className="abLocationMap">

            <iframe
              title="AB Public School Location"
              src="https://www.google.com/maps?q=Jagdish%20Colony%20Ramnagar%20Rohtak%20Haryana&output=embed"
              loading="lazy"
              allowFullScreen
              referrerPolicy="no-referrer-when-downgrade"
            ></iframe>


            {/* MAP TOP BADGE */}

            <div className="abLocationMapBadge">

              <div className="abLocationMapBadgeIcon">
                <FaMapMarkerAlt />
              </div>

              <div>
                <span>YOU&apos;LL FIND US HERE</span>

                <strong>
                  AB Public School
                </strong>

                <small>
                  Ramnagar, Rohtak
                </small>
              </div>

            </div>


            {/* MAP BUTTON */}

            <button
              type="button"
              className="abLocationMapButton"
              onClick={openDirections}
            >

              <FaDirections />

              Open in Google Maps

            </button>

          </div>

        </div>

      </div>

    </section>
  );
};

export default ContactLocation;