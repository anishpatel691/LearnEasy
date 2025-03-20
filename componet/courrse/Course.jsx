import React, { useState, useEffect } from 'react';
import { Button } from 'react-bootstrap';
import './Course.css';

// Demo array of courses (replace this with actual backend data later)
const demoCourses = [
  {
    id: 1,
    title: 'Web Development for Beginners',
    price: '$50',
    instructorName: 'John Doe',
    thumbnail: 'https://via.placeholder.com/300x200',
    description: 'Learn the fundamentals of web development from scratch!',
    rating: 4.5,
  },
  {
    id: 2,
    title: 'Advanced ReactJS',
    price: '$80',
    instructorName: 'Jane Smith',
    thumbnail: 'https://via.placeholder.com/300x200',
    description: 'Master ReactJS with advanced concepts and best practices.',
    rating: 4.8,
  },
  {
    id: 3,
    title: 'Python Programming',
    price: '$60',
    instructorName: 'Michael Brown',
    thumbnail: 'https://via.placeholder.com/300x200',
    description: 'A comprehensive course on Python programming.',
    rating: 4.7,
  },
];

const CoursesPage = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(true);

  // Simulate a data fetch
  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 2000); // Simulate 2 seconds loading time
    return () => clearTimeout(timer);
  }, []);

  // Filter courses based on search query
  const filteredCourses = demoCourses.filter((course) =>
    course.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="courses-page">
      {/* Search bar */}
      <div className="search-container">
        <input
          type="text"
          className="search-input"
          placeholder="Search for courses..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <Button className="search-btn">
          <i className="bi bi-search"></i> Search
        </Button>
      </div>

      {/* Course Cards or Skeleton Loader */}
      <div className="course-card-container">
        <div className="course-cards">
          {loading ? (
            // Show skeleton loaders when loading
            Array(4)
              .fill()
              .map((_, index) => (
                <div key={index} className="skeleton-card">
                  <div className="skeleton-thumbnail"></div>
                  <div className="skeleton-body">
                    <div className="skeleton-title"></div>
                    <div className="skeleton-details"></div>
                    <div className="skeleton-details"></div>
                    <div className="skeleton-button"></div>
                  </div>
                </div>
              ))
          ) : filteredCourses.length > 0 ? (
            filteredCourses.map((course) => (
              <div key={course.id} className="course-card">
                <img src={course.thumbnail} alt={course.title} />
                <div className="course-card-body">
                  <h5>{course.title}</h5>
                  <div className="course-details">
                    <p>
                      <strong>Price:</strong> {course.price}
                    </p>
                    <p>
                      <strong>Instructor:</strong> {course.instructorName}
                    </p>
                    <p>
                      <strong>Rating:</strong> {course.rating} / 5
                    </p>
                  </div>
                  <p className="course-description">{course.description}</p>
                  <Button className="enroll-btn">Enroll Now</Button>
                </div>
              </div>
            ))
          ) : (
            <p>No courses found.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default CoursesPage;
