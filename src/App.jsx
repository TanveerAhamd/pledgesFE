
import { useEffect, useState } from "react";
import { Route, Routes, useLocation, Link } from "react-router-dom";
import { useSelector } from "react-redux";

import Home from "./pages/Home"
import Login from "./pages/Login"
import Signup from "./pages/Signup"
import ForgotPassword from "./pages/ForgotPassword";
import UpdatePassword from "./pages/UpdatePassword";
import VerifyEmail from "./pages/VerifyEmail";
import About from "./pages/About";
import Contact from "./pages/Contact";
import PageNotFound from "./pages/PageNotFound";
import CourseDetails from './pages/CourseDetails';
import Catalog from './pages/Catalog';

import Navbar from "./components/common/Navbar"

import OpenRoute from "./components/core/Auth/OpenRoute"
import ProtectedRoute from "./components/core/Auth/ProtectedRoute";

import Dashboard from "./pages/Dashboard";
import MyProfile from "./components/core/Dashboard/MyProfile";
import Settings from "./components/core/Dashboard/Settings/Settings";
import MyCourses from './components/core/Dashboard/MyCourses';
import EditCourse from './components/core/Dashboard/EditCourse/EditCourse';
import Instructor from './components/core/Dashboard/Instructor';


import Cart from "./components/core/Dashboard/Cart/Cart";
import EnrolledCourses from "./components/core/Dashboard/EnrolledCourses";
import AddCourse from "./components/core/Dashboard/AddCourse/AddCourse";

import ViewCourse from "./pages/ViewCourse";
import VideoDetails from './components/core/ViewCourse/VideoDetails';

import { ACCOUNT_TYPE } from './utils/constants';

import { HiArrowNarrowUp } from "react-icons/hi"
import CreateCategory from "./components/core/Dashboard/CreateCategory";
import AllStudents from './components/core/Dashboard/AllStudents';
import AllInstructors from './components/core/Dashboard/AllInstructors';


function App() {

  const { user } = useSelector((state) => state.profile)

  // Scroll to the top of the page when the component mounts
  const location = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname])

  useEffect(() => {
    scrollTo(0, 0);
  }, [location])

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [])


  // Go upward arrow - show , unshow
  const [showArrow, setShowArrow] = useState(false)

  const handleArrow = () => {
    if (window.scrollY > 500) {
      setShowArrow(true)
    } else setShowArrow(false)
  }

  useEffect(() => {
    window.addEventListener('scroll', handleArrow);
    return () => {
      window.removeEventListener('scroll', handleArrow);
    }
  }, [showArrow])


  return (
    <div className="w-screen min-h-screen bg-richblack-900 flex flex-col font-inter">
      <Navbar />

      {/* go upward arrow */}
      <button onClick={() => window.scrollTo(0, 0)}
        className={`bg-yellow-25 hover:bg-yellow-50 hover:scale-110 p-3 text-lg text-black rounded-2xl fixed right-3 z-10 duration-500 ease-in-out ${showArrow ? 'bottom-6' : '-bottom-24'} `} >
        <HiArrowNarrowUp />
      </button>

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/about" element={<About />} />
        <Route path="catalog/:catalogName" element={<Catalog />} />
        <Route path="courses/:courseId" element={<CourseDetails />} />

        {/* Open Route - for Only Non Logged in User */}
        <Route
          path="signup" element={
            <OpenRoute>
              <Signup />
            </OpenRoute>
          }
        />

        <Route
          path="login" element={
            <OpenRoute>
              <Login />
            </OpenRoute>
          }
        />

        <Route
          path="forgot-password" element={
            <OpenRoute>
              <ForgotPassword />
            </OpenRoute>
          }
        />

        <Route
          path="verify-email" element={
            <OpenRoute>
              <VerifyEmail />
            </OpenRoute>
          }
        />

        <Route
          path="update-password/:id" element={
            <OpenRoute>
              <UpdatePassword />
            </OpenRoute>
          }
        />




        {/* Protected Route - for Only Logged in User */}
        {/* Dashboard */}
        <Route element={
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        }
        >
          <Route path="dashboard/my-profile" element={<MyProfile />} />
          <Route path="dashboard/Settings" element={<Settings />} />

          {/* Route only for Admin */}
          {/* create category, all students, all instructors */}
          {user?.accountType === ACCOUNT_TYPE.ADMIN && (
            <>
              <Route path="dashboard/create-category" element={<CreateCategory />} />
              <Route path="dashboard/all-students" element={<AllStudents />} />
              <Route path="dashboard/all-instructors" element={<AllInstructors />} />
            </>
          )}


          {/* Route only for Students */}
          {/* cart , EnrolledCourses */}
          {user?.accountType === ACCOUNT_TYPE.STUDENT && (
            <>
              <Route path="dashboard/cart" element={<Cart />} />
              <Route path="dashboard/enrolled-courses" element={<EnrolledCourses />} />
            </>
          )}

          {/* Route only for Instructors */}
          {/* add course , MyCourses, EditCourse*/}
          {user?.accountType === ACCOUNT_TYPE.INSTRUCTOR && (
            <>
              <Route path="dashboard/instructor" element={<Instructor />} />
              <Route path="dashboard/add-course" element={<AddCourse />} />
              <Route path="dashboard/my-courses" element={<MyCourses />} />
              <Route path="dashboard/edit-course/:courseId" element={<EditCourse />} />
            </>
          )}
        </Route>


        {/* For the watching course lectures */}
        <Route
          element={
            <ProtectedRoute>
              <ViewCourse />
            </ProtectedRoute>
          }
        >
          {user?.accountType === ACCOUNT_TYPE.STUDENT && (
            <Route
              path="view-course/:courseId/section/:sectionId/sub-section/:subSectionId"
              element={<VideoDetails />}
            />
          )}
        </Route>




        {/* Page Not Found (404 Page ) */}
        <Route path="*" element={<PageNotFound />} />

      </Routes>
      {/* WhatsApp floating button */}
<a
  href="https://wa.me/923000695646"
  target="_blank"
  rel="noopener noreferrer" style={{backgroundColor:"#25d366"}}
  // className="fixed bottom-[150px] right-[100px] z-10 hover:bg-green-600 text-white p-4 rounded-[20px] shadow-lg  hover:scale-110 transition-all duration-300"
  className=" hover:scale-110 p-[10px] text-lg text-white rounded-2xl fixed right-3 z-10 duration-500 ease-in-out bottom-[80px] "
  aria-label="Chat on WhatsApp"
>
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 32 32"
    fill="currentColor"
    className="w-6 h-6"
  >
    <path d="M16.004 2.003c-7.719 0-13.997 6.277-13.997 13.996 0 2.45.643 4.848 1.861 6.96L2 30l7.218-1.888a13.942 13.942 0 0 0 6.786 1.722h.002c7.719 0 13.997-6.278 13.997-13.997 0-3.742-1.458-7.26-4.104-9.905C23.263 3.46 19.745 2.003 16.004 2.003zm0 25.989a11.87 11.87 0 0 1-6.078-1.664l-.434-.258-4.284 1.122 1.141-4.157-.28-.455a11.9 11.9 0 1 1 9.935 5.412zm6.566-8.677c-.359-.18-2.123-1.05-2.453-1.17-.33-.12-.571-.18-.812.18-.24.36-.931 1.17-1.141 1.41-.21.24-.42.27-.779.09-.359-.18-1.517-.558-2.889-1.78-1.068-.951-1.787-2.121-1.997-2.48-.21-.36-.022-.555.158-.735.162-.162.36-.42.539-.63.18-.21.24-.36.36-.6.12-.24.06-.45-.03-.63-.09-.18-.812-1.962-1.113-2.685-.293-.703-.59-.607-.812-.617h-.692c-.24 0-.63.09-.96.45s-1.26 1.23-1.26 3.003c0 1.773 1.29 3.483 1.47 3.723.18.24 2.538 3.873 6.153 5.43.861.372 1.53.594 2.052.762.861.273 1.644.234 2.268.144.69-.102 2.123-.867 2.421-1.704.3-.837.3-1.554.21-1.704-.09-.15-.33-.24-.69-.42z" />
  </svg>
</a>


    </div>
  );
}

export default App;
