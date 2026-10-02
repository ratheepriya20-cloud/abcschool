
import React from "react";

import AboutHero from "../components/AboutHero";
import AboutIntro from "../components/AboutIntro";
import AboutStory from "../components/AboutStory";
import AboutValues from "../components/AboutValues";
import AboutCTA from "../components/AboutCTA";

import "./About.css";
import Achievements from "../components/Achievements";
import PrincipalMessage from "../components/PrincipalMessage";

const About = () => {
  return (
    <main className="abpsAboutPage">

      <AboutHero />

  
      <AboutIntro />

     <Achievements />

     
      <AboutStory />

  
      <AboutValues />

      <PrincipalMessage />

      <AboutCTA />

    </main>
  );
};

export default About;
