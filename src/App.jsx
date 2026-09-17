import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import GalleryPage from "./pages/GalleryPage";
import NoticePage from "./pages/NoticePage";
import AboutSchool from "./pages/AboutSchool";
import VisionMission from "./pages/VisionMission";
import OurLeadership from "./pages/OurLeadership";
import WhyChooseUs from "./pages/WhyChooseUs";
import Contact from "./pages/Contact";
import Facilities from "./pages/Facilities";
import Activities from "./pages/Activities";
import Sports from "./pages/Sports";
import Cultural from "./pages/Cultural";
import Competitions from "./pages/Competitions";
import EducationalTrips from "./pages/EducationalTrips";
import SportsDetail from "./pages/SportsDetail";
import ApplyForm from "./pages/ApplyForm";
import Eligibility from "./pages/Eligibility";
import FeeStructure from "./pages/FeeStructure";
import PrePrimary from "./pages/PrePrimary";
import Academics from "./pages/Academics";
import Curriculum from "./pages/Curriculum";
import Examination from "./pages/Examination";
import SeniorSecondary from "./pages/SeniorSecondary";
import Middle from "./pages/Middle";
import Primary from "./pages/Primary";
import ImportantDates from "./pages/ImportantDates";
import Prospectus from "./pages/Prospectus";
import Achievements from "./pages/Achievements";
import TermsConditions from "./pages/TermsConditions";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import Teachers from "./pages/Teachers";
import Events from "./pages/Events";
import ScrollToTop from "./components/ScrollTop";
import InquiryPopup from "./components/InquiryPopup";
import Results from "./pages/Results";
import AdmissionOverview from "./pages/AdmissionOverview";
import ParentLogin from "./pages/ParentLogin";
import ParentDashboard from "./pages/ParentDashboard/ParentDashboard";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import Faculty from "./pages/Faculty";
import Careers from "./pages/Careers";
import News from "./pages/News";
import AdminDashboard from "./pages/admin/AdminDashboard";
import AdminLogin from "./pages/admin/AdminLogin";


function App() {
  return (
    <>
    <ScrollToTop />
      
    <Routes>
        
      
      <Route path="/" element={ <>
      <Home />
      <InquiryPopup />
      </> }/>
      <Route path="/admin-login" element={<AdminLogin />}/>
      <Route path="/faculty" element={<Faculty />} />
      <Route path="/news" element={<News />} />
      <Route path="/careers" element={<Careers />} />
      <Route path="/parent-login" element={<ParentLogin/>} />
      <Route path="/parent-dashboard" element={<ParentDashboard/>} />
      <Route path="/events" element={<Events />} />
      <Route path="/teachers" element={<Teachers />} />
      <Route path="/privacy" element={<PrivacyPolicy />} />
      <Route path="/terms" element={<TermsConditions />} />
      <Route path="/achievements" element={<Achievements />} />
      <Route path="/admission" element={<AdmissionOverview />} />
      <Route path="/about" element={<AboutSchool />} />
      <Route path="/facilities" element={<Facilities />} />
      <Route path="/contact" element={<Contact />} />
      <Route path="/gallery" element={<GalleryPage />} />
      <Route path="/notices" element={<NoticePage />} />
      <Route path="/vision-mission" element={<VisionMission />} />
      <Route path="/leadership" element={<OurLeadership />} />
      <Route path="/why-us" element={<WhyChooseUs />} />
      <Route path="/activities" element={<Activities />} />
      <Route path="/sports" element={<Sports />} />
      <Route path="/cultural" element={<Cultural />} />
      <Route path="/competitions" element={<Competitions />} />
      <Route path="/trips" element={<EducationalTrips />} />
      <Route path="/sports/:id" element={<SportsDetail />}/>
      <Route path="/apply" element={<ApplyForm />}/>
      <Route path="/admission/eligibility" element={<Eligibility />}/>
      <Route path="/admission/fees" element={<FeeStructure />}/>
      <Route path="/academics" element={<Academics />}/>
      <Route path="/academics/pre-primary" element={<PrePrimary />}/>
      <Route path="/academics/primary" element={<Primary />}/>
      <Route path="/academics/middle" element={<Middle />}/>
      <Route path="/academics/senior-secondary" element={<SeniorSecondary />}/>
      <Route path="/academics/curriculum" element={<Curriculum />}/>
      <Route path="/academics/examination" element={<Examination />}/>
      <Route path="/admission/dates" element={<ImportantDates />}/>
      <Route path="/admission/prospectus" element={<Prospectus />}/>
      <Route path="/sign-up" element={<SignUp />} />
      <Route path="/sign-in" element={<SignIn />} />
      <Route path="/results" element={<Results />} />
      <Route path="/admin" element={<AdminDashboard />} />
   


    </Routes>
    </>
  );
}

export default App;