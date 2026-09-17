import React from "react";
import { Link } from "react-router-dom";

import {
  FaChild,
  FaArrowRight,
  FaCheck,
  FaHeart,
  FaStar,
  FaBookOpen,
  FaPalette,
  FaMusic,
  FaPuzzlePiece,
  FaRunning,
  FaUsers,
  FaGraduationCap,
  FaFileInvoiceDollar,
} from "react-icons/fa";

import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

import "./PrePrimary.css";

const PrePrimary = () => {
  return (
    <>
      <Navbar />

      <main className="abpre2-page">

        {/* ================================================
            HERO
        ================================================= */}

        <section className="abpre2-hero">

          <div className="abpre2-hero-shape abpre2-shape-one"></div>
          <div className="abpre2-hero-shape abpre2-shape-two"></div>

          <div className="abpre2-hero-inner">

            <div className="abpre2-hero-left">

              <div className="abpre2-breadcrumb">
                <Link to="/">Home</Link>
                <span>/</span>
                <Link to="/academics">Academics</Link>
                <span>/</span>
                <strong>Pre-Primary</strong>
              </div>

              <div className="abpre2-label">
                EARLY YEARS • PRE-PRIMARY
              </div>

              <h1>
                Where Little Minds
               
                <span>Begin To Bloom.</span>
              </h1>

              <p>
                A warm and inspiring first step into education, where
                children learn through curiosity, creativity, play and
                meaningful experiences.
              </p>

              <div className="abpre2-hero-buttons">

                <Link
                  to="/apply"
                  className="abpre2-gold-btn"
                >
                  Apply For Admission
                  <FaArrowRight />
                </Link>

                <Link
                  to="/admission/fees"
                  className="abpre2-outline-btn"
                >
                  View Fee Structure
                  <FaFileInvoiceDollar />
                </Link>

              </div>

              <div className="abpre2-trust">

                <div className="abpre2-trust-icon">
                  <FaHeart />
                </div>

                <div>
                  <strong>A Caring First School Experience</strong>
                  <span>Learn • Play • Discover • Grow</span>
                </div>

              </div>

            </div>


            <div className="abpre2-hero-right">

              <div className="abpre2-main-visual">

                <div className="abpre2-visual-top">
                  <span>PRE-PRIMARY</span>
                  <FaStar />
                </div>

                <div className="abpre2-child-symbol">
                  <FaChild />
                </div>

                <h2>
                  Little
                  <br />
                  Explorers
                </h2>

                <p>
                  Growing confidence,
                  curiosity and creativity
                  every day.
                </p>

                <div className="abpre2-visual-footer">
                  <span>01</span>
                  <div></div>
                  <span>BEGIN</span>
                </div>

              </div>

              <div className="abpre2-floating-note">
                <FaCheck />
                <div>
                  <strong>Happy Learning</strong>
                  <span>Every day matters</span>
                </div>
              </div>

            </div>

          </div>

        </section>


       

        {/* ================================================
            LEARNING EXPERIENCE
        ================================================= */}

        <section className="abpre2-experience">

          <div className="abpre2-section-head">

            <div>
              <span>THE LEARNING EXPERIENCE</span>

              <h2>
                Learning Should
                <strong> Feel Wonderful.</strong>
              </h2>
            </div>


          </div>


          <div className="abpre2-experience-grid">

            <div className="abpre2-experience-card abpre2-large-card">

              <div className="abpre2-card-icon">
                <FaPuzzlePiece />
              </div>

              <span>01</span>

              <h3>
                Learn Through
                <br />
                Play
              </h3>

              <p>
                Children naturally discover concepts through games,
                activities, stories and hands-on experiences.
              </p>

            </div>


            <div className="abpre2-experience-card">

              <div className="abpre2-card-icon">
                <FaPalette />
              </div>

              <span>02</span>

              <h3>Creative Expression</h3>

              <p>
                Art, craft and imaginative activities give children
                opportunities to express their ideas.
              </p>

            </div>


            <div className="abpre2-experience-card">

              <div className="abpre2-card-icon">
                <FaBookOpen />
              </div>

              <span>03</span>

              <h3>Early Learning</h3>

              <p>
                Language, numbers and basic concepts are introduced
                through engaging everyday experiences.
              </p>

            </div>


            <div className="abpre2-experience-card">

              <div className="abpre2-card-icon">
                <FaMusic />
              </div>

              <span>04</span>

              <h3>Music & Movement</h3>

              <p>
                Songs, rhymes and movement activities make the classroom
                energetic and joyful.
              </p>

            </div>


            <div className="abpre2-experience-card">

              <div className="abpre2-card-icon">
                <FaUsers />
              </div>

              <span>05</span>

              <h3>Social Growth</h3>

              <p>
                Children learn to communicate, share, cooperate and
                build positive friendships.
              </p>

            </div>


            <div className="abpre2-experience-card abpre2-gold-card">

              <div className="abpre2-card-icon">
                <FaRunning />
              </div>

              <span>06</span>

              <h3>Active Childhood</h3>

              <p>
                Movement and outdoor activities support healthy physical
                development and confidence.
              </p>

            </div>

          </div>

        </section>


        {/* ================================================
            DEVELOPMENT
        ================================================= */}

        <section className="abpre2-development">

          <div className="abpre2-development-left">

            <div className="abpre2-side-label">
              02 / DEVELOPMENT
            </div>

            <h2>
              Growing
             
              <span>Every Day.</span>
            </h2>

            <p>
              We focus on developing the whole child — not just academic
              knowledge. Each day brings new opportunities to discover,
              communicate and become more independent.
            </p>

            <Link
              to="/admission/process"
              className="abpre2-text-link"
            >
              Explore Admission Process
              <FaArrowRight />
            </Link>

          </div>


          <div className="abpre2-development-right">

            <div className="abpre2-development-item">
              <div className="abpre2-development-icon">
                <FaChild />
              </div>

              <div>
                <h3>Confidence</h3>
                <p>
                  Encouraging children to participate and express
                  themselves freely.
                </p>
              </div>
            </div>


            <div className="abpre2-development-item">
              <div className="abpre2-development-icon">
                <FaBookOpen />
              </div>

              <div>
                <h3>Curiosity</h3>
                <p>
                  Inspiring children to ask questions and explore
                  the world around them.
                </p>
              </div>
            </div>


            <div className="abpre2-development-item">
              <div className="abpre2-development-icon">
                <FaHeart />
              </div>

              <div>
                <h3>Kindness</h3>
                <p>
                  Building empathy, respect and positive relationships.
                </p>
              </div>
            </div>


            <div className="abpre2-development-item">
              <div className="abpre2-development-icon">
                <FaGraduationCap />
              </div>

              <div>
                <h3>School Readiness</h3>
                <p>
                  Developing the habits and skills needed for the next
                  stage of learning.
                </p>
              </div>
            </div>

          </div>

        </section>


        {/* ================================================
            PATH / FEE / ADMISSION FLOW
        ================================================= */}

        <section className="abpre2-path">

          <div className="abpre2-path-heading">

            <span>YOUR NEXT STEP</span>

            <h2>
              From Interest
              <strong> To Admission.</strong>
            </h2>

            <p>
              Everything you need to begin your child's school journey
              is just a step away.
            </p>

          </div>


          <div className="abpre2-path-grid">

            {/* STEP 1 */}

            <div className="abpre2-path-card">

              <div className="abpre2-path-number">
                01
              </div>

              <div className="abpre2-path-icon">
                <FaBookOpen />
              </div>

              <span>EXPLORE</span>

              <h3>
                Discover
                
                Pre-Primary
              </h3>

              <p>
                Understand our learning approach and programme.
              </p>

              <Link to="/academics/pre-primary">
                Explore Programme
                <FaArrowRight />
              </Link>

            </div>


            {/* STEP 2 */}

            <div className="abpre2-path-card abpre2-path-featured">

              <div className="abpre2-path-number">
                02
              </div>

              <div className="abpre2-path-icon">
                <FaFileInvoiceDollar />
              </div>

              <span>PLAN</span>

              <h3>
                View Fee
                
                Structure
              </h3>

              <p>
                Check the applicable fee structure before applying.
              </p>

              <Link to="/admission/fees">
                View Fees
                <FaArrowRight />
              </Link>

            </div>


            {/* STEP 3 */}

            <div className="abpre2-path-card">

              <div className="abpre2-path-number">
                03
              </div>

              <div className="abpre2-path-icon">
                <FaGraduationCap />
              </div>

              <span>BEGIN</span>

              <h3>
                Submit
                
                Application
              </h3>

              <p>
                Complete the admission application form online.
              </p>

              <Link to="/apply">
                Start Application
                <FaArrowRight />
              </Link>

            </div>

          </div>


          <div className="abpre2-flow">

            <div>
              <span>01</span>
              <strong>Pre-Primary</strong>
            </div>

            <div className="abpre2-flow-line"></div>

            <div>
              <span>02</span>
              <strong>Fee Structure</strong>
            </div>

            <div className="abpre2-flow-line"></div>

            <div>
              <span>03</span>
              <strong>Admission Form</strong>
            </div>

          </div>

        </section>


        {/* ================================================
            FINAL CTA
        ================================================= */}

        <section className="abpre2-final">

          <div className="abpre2-final-inner">

            <div>

              <span>READY TO BEGIN?</span>

              <h2>
                Give Your Child
                <br />
                <strong>A Beautiful Beginning.</strong>
              </h2>

              <p>
                Explore the fee structure and continue to the admission
                application whenever you are ready.
              </p>

            </div>


            <div className="abpre2-final-actions">

              <Link
                to="/admission/fees"
                className="abpre2-final-fee"
              >
                Fee Structure
                <FaFileInvoiceDollar />
              </Link>

              <Link
                to="/apply"
                className="abpre2-final-apply"
              >
                Apply Now
                <FaArrowRight />
              </Link>

            </div>

          </div>

        </section>

      </main>

      <Footer />
    </>
  );
};

export default PrePrimary;