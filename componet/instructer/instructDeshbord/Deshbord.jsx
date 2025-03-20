import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaBook, FaShoppingCart, FaUsers, FaRupeeSign, FaChalkboardTeacher, FaClipboardList } from "react-icons/fa";
import "./InstructorDashboard.css";

const InstructorDashboard = () => {
  const [isLogin, setIsLogin] = useState(false);
  const [dashboardData, setDashboardData] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const isUserLoggedIn = sessionStorage.getItem("LoginStatus") === "true";
    if (!isUserLoggedIn) {
      navigate("/login"); // Redirect to login if not logged in
    } else {
      setIsLogin(true);
      fetchDashboardData(); // Fetch dashboard data when logged in
    }
  }, [navigate, isLogin]);

  const fetchDashboardData = () => {
    const fetchedData = {
      totalCourses: 8,
      coursesPurchased: 45,
      totalRevenue: 12500, // in INR
      totalStudents: 120,
      topSellingCourses: [
        { id: 1, title: "React for Beginners", sales: 20 },
        { id: 2, title: "Full Stack Development", sales: 15 },
        { id: 3, title: "Python Masterclass", sales: 10 },
      ],
      recentEnrollments: [
        { id: 1, student: "Amit Kumar", course: "React for Beginners" },
        { id: 2, student: "Pooja Sharma", course: "Python Masterclass" },
        { id: 3, student: "Rahul Verma", course: "Full Stack Development" },
      ],
    };
    setDashboardData(fetchedData);
  };

  if (!isLogin || !dashboardData) {
    return null;
  }

  return (
    <div className="dashboard-container">
      <h1 className="dashboard-title">Instructor Dashboard</h1>
      <p className="dashboard-subtitle">Welcome back! Here’s a quick summary of your course stats.</p>

      {/* Summary Cards */}
      <div className="dashboard-summary">
        <div className="summary-card">
          <FaBook className="summary-icon" />
          <h3>{dashboardData.totalCourses}</h3>
          <p>Total Courses Uploaded</p>
        </div>
        <div className="summary-card">
          <FaShoppingCart className="summary-icon" />
          <h3>{dashboardData.coursesPurchased}</h3>
          <p>Courses Purchased</p>
        </div>
        <div className="summary-card">
          <FaUsers className="summary-icon" />
          <h3>{dashboardData.totalStudents}</h3>
          <p>Total Students Enrolled</p>
        </div>
        <div className="summary-card">
          <FaRupeeSign className="summary-icon" />
          <h3>₹{dashboardData.totalRevenue.toLocaleString()}</h3>
          <p>Total Revenue Earned</p>
        </div>
      </div>

      {/* Top Selling Courses */}
      <section className="dashboard-section">
        <h2>Top Selling Courses</h2>
        <ul>
          {dashboardData.topSellingCourses.map((course) => (
            <li key={course.id}>
              {course.title} - <strong>{course.sales} Sales</strong>
            </li>
          ))}
        </ul>
      </section>

      {/* Recent Student Enrollments */}
      <section className="dashboard-section">
        <h2>Recent Student Enrollments</h2>
        <ul>
          {dashboardData.recentEnrollments.map((enrollment) => (
            <li key={enrollment.id}>
              {enrollment.student} enrolled in <strong>{enrollment.course}</strong>
            </li>
          ))}
        </ul>
      </section>

      {/* Course Management */}
      <div className="dashboard-actions">
        <Link to="/instructor/manage-courses" className="action-btn">
          <FaClipboardList className="btn-icon" /> Manage Courses
        </Link>
        <Link to="/instructor/manage-students" className="action-btn">
          <FaChalkboardTeacher className="btn-icon" /> Manage Students
        </Link>
      </div>
    </div>
  );
};

export default InstructorDashboard;
