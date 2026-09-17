import React from "react";
import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import QuickInfo from "../components/QuickInfo";
import WelcomeSection from "../components/WelcomeSection";
import Achievements from "../components/Achievements";
import PrincipalMessage from "../components/PrincipalMessage";
import AcademicsSection from "../components/AcademicsSection";

import Testimonials from "../components/Testimonial";
import AdmissionCTA from "../components/AdmissionCTA";
import LatestNewsNotice from "../components/LatestNewsNotice";
import Gallery from "../components/Gallery";
import Footer from "../components/Footer";

function Home(){
    return(
        <>
        <Navbar />
        <Hero />
        <QuickInfo />
        <WelcomeSection />
     
        <Achievements />
        <PrincipalMessage />
        <AcademicsSection />
        
        <Testimonials />
        <LatestNewsNotice />
        <Gallery />
        <AdmissionCTA />
        <Footer />
        </>
    );
}

export default Home;