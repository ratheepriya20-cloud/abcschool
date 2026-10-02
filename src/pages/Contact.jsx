import React from "react";

import ContactHero from "../components/ContactHero";
import ContactMessage from "../components/ContactMessage";
import ContactFAQ from "../components/ContactFAQ";
import ContactAdmissionCTA from "../components/ContactAdmissionCTA";

const Contact = () => {
  return (
    <main className="abpsContactPage">

      <ContactHero />


      

     
        <ContactMessage />
       

    

      <ContactFAQ />

    <ContactAdmissionCTA />

    </main>
  );
};

export default Contact;