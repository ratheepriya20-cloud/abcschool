import React, {
  useState,
} from "react";

import {
  Routes,
  Route,
  useLocation,
} from "react-router-dom";

import "./App.css";

import Navbar from "./components/Navbar";
import ScrollTop from "./components/ScrollTop";
import Footer from "./components/Footer";
import AdmissionPopup from "./components/AdmissionPopup";
import InquiryPopup from "./components/InquiryPopup";
import ProtectedRoute from "./components/ProtectedRoute";
import ParentLogin from "./pages/parent/ParentLogin";
import ParentDashboard from "./pages/parent/ParentDashboard";
import ParentSignup from "./pages/parent/ParentSignup";
import Home from "./pages/Home";
import Admission from "./pages/Admission";
import Academics from "./pages/Academics";
import Faculty from "./pages/Faculty";
import Contact from "./pages/Contact";
import About from "./pages/About";
import ApplyForm from "./pages/ApplyForm";
import CampusLife from "./pages/CampusLife";
import Sports from "./pages/Sports";
import Gallery from "./pages/Gallery";
import Facilities from "./pages/Facilities";
import CulturalActivities from "./pages/CulturalActivities";
import Competitions from "./pages/Competitions";
import EducationalTrips from "./pages/EducationalTrips";
import NewsNotices from "./pages/NewsNotices";
import ClientDashboard from "./pages/client/ClientDashboard";
import AdminLogin from "./pages/admin/AdminLogin";
import SuperAdminDashboard from "./pages/admin/super-admin/SuperAdminDashboard";
import SubAdminDashboard from "./pages/admin/sub-admin/SubAdminDashboard";
import TeacherLogin from "./pages/teacher/TeacherLogin";
import TeacherDashboard from "./pages/teacher/TeacherDashboard";
import StudentSignup from "./pages/student/StudentSignup";
import StudentLogin from "./pages/student/StudentLogin";
import StudentDashboard from "./pages/student/StudentDashboard";
import ParentProtectedRoute from "./components/ParentProtectedRoute";
import StudentProtectedRoute from "./components/StudentProtectedRoute";
import TermsConditions from "./pages/TermsConditions";
import PrivacyPolicy from "./pages/PrivacyPolicy";

function AppLayout() {

  const location =
    useLocation();



  const [
    showInquiryPopup,
    setShowInquiryPopup,
  ] = useState(false);


  // =======================================================
  // CURRENT PATH
  // =======================================================

  const currentPath =
    location.pathname;


  // =======================================================
  // PORTAL AREA CHECK
  // =======================================================

  const isAdminArea =
    currentPath.startsWith(
      "/admin"
    );

  const isParentArea =
    currentPath.startsWith(
      "/parent"
    );

  const isTeacherArea =
    currentPath.startsWith(
      "/teacher"
    );

  const isStudentArea =
    currentPath.startsWith(
      "/student"
    );

  const isClientArea =
    currentPath.startsWith(
      "/client"
    );


  // Admin login bhi portal area
  // maana jayega taaki Navbar/Footer
  // login page par na aaye.

  const isAdminLoginPage =
    currentPath === "/login";


  const isPortalArea =
    isAdminArea ||
    isParentArea ||
    isTeacherArea ||
    isStudentArea ||
    isClientArea ||
    isAdminLoginPage;


  // =======================================================
  // HOME CHECK
  // =======================================================

  const isHomePage =
    currentPath === "/";


  // =======================================================
  // OPEN INQUIRY
  // =======================================================

  const openInquiryPopup =
    () => {

      setShowInquiryPopup(
        true
      );

    };


  // =======================================================
  // CLOSE INQUIRY
  // =======================================================

  const closeInquiryPopup =
    () => {

      setShowInquiryPopup(
        false
      );

    };


  // =======================================================
  // RENDER
  // =======================================================

  return (
    <>

      <ScrollTop />


      {/* =================================================
          PUBLIC NAVBAR
      ================================================= */}

      {!isPortalArea && (
        <Navbar />
      )}


      {/* =================================================
          HOME ADMISSION POPUP
      ================================================= */}

      {!isPortalArea &&
        isHomePage && (

          <AdmissionPopup
            onInquiryClick={
              openInquiryPopup
            }
          />

        )}


      {/* =================================================
          INQUIRY POPUP
      ================================================= */}

      {!isPortalArea &&
        showInquiryPopup && (

          <InquiryPopup
            onClose={
              closeInquiryPopup
            }
          />

        )}


      {/* =================================================
          ROUTES
      ================================================= */}

      <Routes>


        {/* =================================================
            PUBLIC WEBSITE
        ================================================= */}


        {/* HOME */}

        <Route
          path="/"
          element={
            <Home />
          }
        />


        {/* ABOUT */}

        <Route
          path="/about"
          element={
            <About />
          }
        />


        {/* ADMISSION */}

        <Route
          path="/admission"
          element={
            <Admission />
          }
        />


        {/* ACADEMICS */}

        <Route
          path="/academics"
          element={
            <Academics />
          }
        />

        <Route
          path="/privacy-policy"
          element={
            <PrivacyPolicy />
          }
        />

        {/* FACULTY */}

        <Route
          path="/faculty"
          element={
            <Faculty />
          }
        />


        {/* APPLY */}

        <Route
          path="/apply"
          element={
            <ApplyForm />
          }
        />


        {/* CONTACT */}

        <Route
          path="/contact"
          element={
            <Contact />
          }
        />


        {/* CAMPUS LIFE */}

        <Route
          path="/campus-life"
          element={
            <CampusLife />
          }
        />


        {/* SPORTS */}

        <Route
          path="/sports"
          element={
            <Sports />
          }
        />


        {/* CULTURAL ACTIVITIES */}

        <Route
          path="/cultural-activities"
          element={
            <CulturalActivities />
          }
        />


        {/* COMPETITIONS */}

        <Route
          path="/competitions"
          element={
            <Competitions />
          }
        />


        {/* EDUCATIONAL TRIPS */}

        <Route
          path="/educational-trips"
          element={
            <EducationalTrips />
          }
        />
 <Route
          path="/terms-conditions"
          element={
            <TermsConditions />
          }
        />


        {/* NEWS & NOTICES */}

        <Route
          path="/news-notices"
          element={
            <NewsNotices />
          }
        />


        {/* GALLERY */}

        <Route
          path="/gallery"
          element={
            <Gallery />
          }
        />


        {/* FACILITIES */}

        <Route
          path="/facilities"
          element={
            <Facilities />
          }
        />

{/* =========================
    STUDENT PORTAL
========================= */}

<Route
  path="/student/signup"
  element={<StudentSignup />}
/>

<Route
  path="/student/login"
  element={<StudentLogin />}
/>

<Route
  path="/student/dashboard"
  element={
    <StudentProtectedRoute>
      <StudentDashboard />
    </StudentProtectedRoute>
  }
/>

        <Route
          path="/login"
          element={
            <AdminLogin />
          }
        />

 {/* =========================
    PARENT PORTAL
========================= */}

<Route
  path="/parent/signup"
  element={<ParentSignup />}
/>

<Route
  path="/parent/login"
  element={<ParentLogin />}
/>

<Route path="/parent/dashboard" element={
    <ParentProtectedRoute>
      <ParentDashboard />
    </ParentProtectedRoute> } />


       {/* ===============================
    SUPER ADMIN
================================ */}

<Route
  path="/admin/super"
  element={
    <ProtectedRoute
      allowedRoles={[
        "super-admin",
      ]}
    >
      <SuperAdminDashboard />
    </ProtectedRoute>
  }
/>


{/* ===============================
    SUB ADMIN
================================ */}

<Route
  path="/admin/sub"
  element={
    <ProtectedRoute
      allowedRoles={[
        "sub-admin",
      ]}
    >
      <SubAdminDashboard />
    </ProtectedRoute>
  }
/>

        {/* =================================================
            TEACHER LOGIN
        ================================================= */}

        <Route
          path="/teacher/login"
          element={
            <TeacherLogin />
          }
        />


        {/* =================================================
            TEACHER DASHBOARD

            LOGIN REQUIRED
        ================================================= */}

        <Route
          path="/teacher/dashboard"
          element={

            <ProtectedRoute
              allowedRoles={[
                "teacher",
              ]}
            >

              <TeacherDashboard />

            </ProtectedRoute>

          }
        />


        {/* =================================================
            CLIENT
        ================================================= */}

        <Route
          path="/client/dashboard"
          element={
            <ClientDashboard />
          }
        />


      </Routes>


      {/* =================================================
          PUBLIC FOOTER
      ================================================= */}

      {!isPortalArea && (
        <Footer />
      )}

    </>
  );
}


// =========================================================
// APP
// =========================================================

function App() {

  return (
    <AppLayout />
  );

}


export default App;