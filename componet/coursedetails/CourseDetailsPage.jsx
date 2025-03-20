import React, { useState } from 'react';
import { Button } from 'react-bootstrap';
import './EnrolledCoursesPage.css';

// Demo array of enrolled courses (replace with actual backend data)
const enrolledCourses = [
  {
    id: 1,
    title: 'Web Development for Beginners',
    instructorName: 'John Doe',
    description: 'Learn the fundamentals of web development from scratch!',
    lectures: [
      { id: 1, title: 'Introduction to HTML', videoUrl: 'https://www.w3schools.com/html/' },
      { id: 2, title: 'CSS Basics', videoUrl: 'https://www.w3schools.com/css/' },
    ],
  },
  {
    id: 2,
    title: 'Advanced ReactJS',
    instructorName: 'Jane Smith',
    description: 'Master ReactJS with advanced concepts and best practices.',
    lectures: [
      { id: 1, title: 'React Components', videoUrl: 'https://reactjs.org/docs/components-and-props.html' },
      { id: 2, title: 'React State and Lifecycle', videoUrl: 'https://reactjs.org/docs/state-and-lifecycle.html' },
    ],
  },
  {
    id: 3,
    title: 'Python Programming',
    instructorName: 'Michael Brown',
    description: 'A comprehensive course on Python programming.',
    lectures: [
      { id: 1, title: 'Introduction to Python', videoUrl: 'https://www.python.org/doc/' },
      { id: 2, title: 'Functions in Python', videoUrl: 'https://realpython.com/python-functions/' },
    ],
  },
];

const EnrolledCoursesPage = () => {
  const [selectedCourse, setSelectedCourse] = useState(null);

  const handleCourseClick = (course) => {
    setSelectedCourse(course);
  };

  const handleLectureClick = (videoUrl) => {
    window.open(videoUrl, '_blank');
  };

  return (
    <div className="enrolled-courses-page">
      <h2>Your Enrolled Courses</h2>

      <div className="course-list">
        {enrolledCourses.length > 0 ? (
          enrolledCourses.map(course => (
            <div
              key={course.id}
              className="course-card"
              onClick={() => handleCourseClick(course)}
            >
              <div className="course-card-body">
                <h5>{course.title}</h5>
                <p><strong>Instructor:</strong> {course.instructorName}</p>
                <p><strong>Description:</strong> {course.description}</p>
              </div>
            </div>
          ))
        ) : (
          <p>No enrolled courses found.</p>
        )}
      </div>

      {selectedCourse && (
        <div className="lectures-container">
          <h3>Lectures for: {selectedCourse.title}</h3>
          <ul>
            {selectedCourse.lectures.map(lecture => (
              <li key={lecture.id} className="lecture-item">
                <Button
                  className="lecture-btn"
                  onClick={() => handleLectureClick(lecture.videoUrl)}
                >
                  {lecture.title}
                </Button>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default EnrolledCoursesPage;
