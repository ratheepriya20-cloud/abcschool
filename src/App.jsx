import React, {
  lazy,
  Suspense,
  useState,
} from "react";

import {
  Routes,
  Route,
  useLocation,
} from "react-router-dom";

import "./App.css";

/* =========================================================
   COMMON COMPONENTS
========================================================= */

import Navbar from "./components/Navbar";
import ScrollTop from "./components/ScrollTop";
import Footer from "./components/Footer";

import AdmissionPopup from "./components/AdmissionPopup";
import InquiryPopup from "./components/InquiryPopup";

import ProtectedRoute from "./components/ProtectedRoute";
import ParentProtectedRoute from "./components/ParentProtectedRoute";
import StudentProtectedRoute from "./components/StudentProtectedRoute";


/* =========================================================
   PUBLIC PAGES - LAZY LOADING
========================================================= */

const Home = lazy(() =>
  import("./pages/Home")
);

const Admission = lazy(() =>
  import("./pages/Admission")
);

const Academics = lazy(() =>
  import("./pages/Academics")
);

const Faculty = lazy(() =>
  import("./pages/Faculty")
);

const Contact = lazy(() =>
  import("./pages/Contact")
);

const About = lazy(() =>
  import("./pages/About")
);

const ApplyForm = lazy(() =>
  import("./pages/ApplyForm")
);

const CampusLife = lazy(() =>
  import("./pages/CampusLife")
);

const Sports = lazy(() =>
  import("./pages/Sports")
);

const Gallery = lazy(() =>
  import("./pages/Gallery")
);

const Facilities = lazy(() =>
  import("./pages/Facilities")
);

const CulturalActivities = lazy(() =>
  import("./pages/CulturalActivities")
);

const Competitions = lazy(() =>
  import("./pages/Competitions")
);

const EducationalTrips = lazy(() =>
  import("./pages/EducationalTrips")
);

const NewsNotices = lazy(() =>
  import("./pages/NewsNotices")
);

const TermsConditions = lazy(() =>
  import("./pages/TermsConditions")
);

const PrivacyPolicy = lazy(() =>
  import("./pages/PrivacyPolicy")
);


/* =========================================================
   ADMIN - LAZY LOADING
========================================================= */

const AdminLogin = lazy(() =>
  import("./pages/admin/AdminLogin")
);

const SuperAdminDashboard = lazy(() =>
  import(
    "./pages/admin/super-admin/SuperAdminDashboard"
  )
);

const SubAdminDashboard = lazy(() =>
  import(
    "./pages/admin/sub-admin/SubAdminDashboard"
  )
);


/* =========================================================
   PARENT - LAZY LOADING
========================================================= */

const ParentLogin = lazy(() =>
  import("./pages/parent/ParentLogin")
);

const ParentSignup = lazy(() =>
  import("./pages/parent/ParentSignup")
);

const ParentDashboard = lazy(() =>
  import("./pages/parent/ParentDashboard")
);


/* =========================================================
   STUDENT - LAZY LOADING
========================================================= */

const StudentSignup = lazy(() =>
  import("./pages/student/StudentSignup")
);

const StudentLogin = lazy(() =>
  import("./pages/student/StudentLogin")
);

const StudentDashboard = lazy(() =>
  import("./pages/student/StudentDashboard")
);


/* =========================================================
   TEACHER - LAZY LOADING
========================================================= */

const TeacherLogin = lazy(() =>
  import("./pages/teacher/TeacherLogin")
);

const TeacherDashboard = lazy(() =>
  import("./pages/teacher/TeacherDashboard")
);


/* =========================================================
   CLIENT - LAZY LOADING
========================================================= */

const ClientDashboard = lazy(() =>
  import("./pages/client/ClientDashboard")
);


/* =========================================================
   PAGE LOADER
========================================================= */

const PageLoader = () => {
  return (
    <div
      style={{
        width: "100%",
        minHeight: "65vh",

        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "column",

        gap: "14px",

        background: "#ffffff",
        color: "#071a35",
      }}
    >
      <div
        className="app-loading-spinner"
      />

      <p
        style={{
          margin: 0,
          fontSize: "17px",
          fontWeight: "700",
        }}
      >
        Loading...
      </p>
    </div>
  );
};


/* =========================================================
   APP LAYOUT
========================================================= */

function AppLayout() {
  const location = useLocation();

  /* =======================================================
     INQUIRY POPUP
  ======================================================= */

  const [
    showInquiryPopup,
    setShowInquiryPopup,
  ] = useState(false);


  /* =======================================================
     CURRENT PATH
  ======================================================= */

  const currentPath =
    location.pathname;


  /* =======================================================
     PORTAL AREA CHECK
  ======================================================= */

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


  /* Admin login par website
     Navbar/Footer nahi chahiye */

  const isAdminLoginPage =
    currentPath === "/login";


  const isPortalArea =
    isAdminArea ||
    isParentArea ||
    isTeacherArea ||
    isStudentArea ||
    isClientArea ||
    isAdminLoginPage;


  /* =======================================================
     HOME PAGE CHECK
  ======================================================= */

  const isHomePage =
    currentPath === "/";


  /* =======================================================
     OPEN INQUIRY POPUP
  ======================================================= */

  const openInquiryPopup = () => {
    setShowInquiryPopup(true);
  };


  /* =======================================================
     CLOSE INQUIRY POPUP
  ======================================================= */

  const closeInquiryPopup = () => {
    setShowInquiryPopup(false);
  };


  /* =======================================================
     RENDER
  ======================================================= */

  return (
    <>
      <ScrollTop />


      {/* =====================================================
          PUBLIC NAVBAR
      ===================================================== */}

      {!isPortalArea && (
        <Navbar />
      )}


      {/* =====================================================
          HOME ADMISSION POPUP
      ===================================================== */}

      {!isPortalArea &&
        isHomePage && (
          <AdmissionPopup
            onInquiryClick={
              openInquiryPopup
            }
          />
        )}


      {/* =====================================================
          INQUIRY POPUP
      ===================================================== */}

      {!isPortalArea &&
        showInquiryPopup && (
          <InquiryPopup
            onClose={
              closeInquiryPopup
            }
          />
        )}


      {/* =====================================================
          LAZY ROUTES
      ===================================================== */}

      <Suspense
        fallback={
          <PageLoader />
        }
      >
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


          {/* PRIVACY POLICY */}

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


          {/* TERMS CONDITIONS */}

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


          {/* =================================================
              STUDENT PORTAL
          ================================================= */}


          {/* STUDENT SIGNUP */}

          <Route
            path="/student/signup"
            element={
              <StudentSignup />
            }
          />


          {/* STUDENT LOGIN */}

          <Route
            path="/student/login"
            element={
              <StudentLogin />
            }
          />


          {/* STUDENT DASHBOARD */}

          <Route
            path="/student/dashboard"
            element={
              <StudentProtectedRoute>
                <StudentDashboard />
              </StudentProtectedRoute>
            }
          />


          {/* =================================================
              ADMIN LOGIN
          ================================================= */}

          <Route
            path="/login"
            element={
              <AdminLogin />
            }
          />


          {/* =================================================
              PARENT PORTAL
          ================================================= */}


          {/* PARENT SIGNUP */}

          <Route
            path="/parent/signup"
            element={
              <ParentSignup />
            }
          />


          {/* PARENT LOGIN */}

          <Route
            path="/parent/login"
            element={
              <ParentLogin />
            }
          />


          {/* PARENT DASHBOARD */}

          <Route
            path="/parent/dashboard"
            element={
              <ParentProtectedRoute>
                <ParentDashboard />
              </ParentProtectedRoute>
            }
          />


          {/* =================================================
              SUPER ADMIN
          ================================================= */}

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


          {/* =================================================
              SUB ADMIN
          ================================================= */}

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
              TEACHER PORTAL
          ================================================= */}


          {/* TEACHER LOGIN */}

          <Route
            path="/teacher/login"
            element={
              <TeacherLogin />
            }
          />


          {/* TEACHER DASHBOARD */}

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
              CLIENT DASHBOARD
          ================================================= */}

          <Route
            path="/client/dashboard"
            element={
              <ClientDashboard />
            }
          />

        </Routes>
      </Suspense>


      {/* =====================================================
          PUBLIC FOOTER
      ===================================================== */}

      {!isPortalArea && (
        <Footer />
      )}

    </>
  );
}


/* =========================================================
   MAIN APP
========================================================= */

function App() {
  return (
    <AppLayout />
  );
}

export default App;