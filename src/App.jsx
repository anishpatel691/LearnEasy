import React from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Home from '../componet/homepage/Home';
import CoursesPage from '../componet/courrse/Course';
import LeftSidebarNavbar from '../componet/navbar/navbar';
import LoginRegister from '../componet/LogRegister/LoginRegister';
import Loginstatus from './Loginstatus';
import Notification from '../componet/notification/Notification';
import SomeOtherComponent from './Log';
import CourseDetailsPage from '../componet/coursedetails/CourseDetailsPage';
import CourseVideoPage from '../componet/CourseVideoPage/CourseVideoPage';
import { useUser } from '../context/authContaxt';
import StudentDashboard from '../componet/students/dasbord/Dashboard';
import InstructorDashboard from '../componet/instructer/instructDeshbord/Deshbord';
import InstructorNavbar from '../componet/instructer/instructnavbar/Navbar';
import UploadCourse from '../componet/instructer/courseuploaded/Courseupload';
import UploadLecture from '../componet/instructer/AddLecture/AddLecture';
import StudentCorner from '../componet/students/Studentcourner/StudentCorner';
import ViewCourse from '../componet/students/viewcourse/ViewCourse';
import WatchLecture from '../componet/students/watchlectures/WatchLecture';
import ForgotPassword from '../componet/forgetpassword/ForgotPassword';
import PaymentIntegration from '../componet/instructer/PaymentDemo';
import PaymentInterface from '../componet/instructer/PaymentInterface';
const Contact = () => <div>Contact Us</div>;

const App = () => {
  const { usertype, usertypeInstru } = useUser(); // Access the userId and loginStatus from context
  
  let Instructer = usertypeInstru; // Trim any extra spaces
  let Student = usertype; // Trim any extra spaces

  return (
    <Router>
      {/* Conditional Navbar rendering */}
      <MainNavbar />
      
      <Notification />
      <div className="content">
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<Home />} />
          <Route path="/courses" element={<StudentCorner />} />

          <Route path="/contact" element={<Contact />} />
          <Route path="/login" element={<LoginRegister />} />
          <Route path="/logins" element={<Loginstatus />} />
          <Route path="/l" element={<SomeOtherComponent />} />
          <Route path="/coursevi" element={<CourseVideoPage />} />
          <Route path="/forgetpasssentotp" element={<ForgotPassword />} />
          <Route path="/py" element={<PaymentIntegration/>} />
          <Route path="/payment-interface" element={<PaymentInterface />} />

          {/* Student Routes */}
          {Student === 'student' && (<>
            <Route path="/student/dashboard" element={<StudentDashboard />} />
            <Route path="/s/courses" element={<StudentCorner />} />
            <Route path="/s/courses/:courseId" element={<ViewCourse />} />
            <Route path="/s/lectures/:courseId/:lectureId" element={<WatchLecture />} />



            </> )}

          {/* Instructor Routes */}
          {Instructer === 'instructor' && (
<>
<Route path="/instructor/dashboard" element={<InstructorDashboard />} />
            <Route path="/instructor/manage-courses" element={<UploadCourse />} />
            <Route path='/instructor/add_lecture' element ={<UploadLecture/>}/>
            </>      )}
        </Routes>
      </div>
    </Router>
  );
};

// This component renders the appropriate Navbar
const MainNavbar = () => {
  const location = useLocation(); // Get current location to determine the route

  const isDashboardRoute = location.pathname.includes('/student') || location.pathname.includes('/instructor');

  return isDashboardRoute ? <InstructorNavbar/> : <LeftSidebarNavbar/>;
};

export default App;
