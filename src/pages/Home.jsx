import React from "react";
import Hero from "../components/Hero";
import QuickInfo from "../components/QuickInfo";
import WelcomeSection from "../components/WelcomeSection";
import Achievements from "../components/Achievements";
import PrincipalMessage from "../components/PrincipalMessage";
import AcademicsSection from "../components/AcademicsSection";

import Testimonials from "../components/Testimonial";
import AdmissionCTA from "../components/AdmissionCTA";

function Home(){
    return(
        <>
        
        <Hero />
        <QuickInfo />
        <WelcomeSection />
     
        <Achievements />
        <PrincipalMessage />
        <AcademicsSection />
        
        <Testimonials />
      
        <AdmissionCTA />
        
        </>
    );
}

export default Home;