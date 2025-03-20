import React, { useState } from 'react';
import { Button, Form, ListGroup } from 'react-bootstrap';
import './CourseVideoPage.css';

// Demo array of courses and lectures (replace with actual backend data)
const coursesData = [
  {
    id: 1,
    title: 'Web Development for Beginners',
    instructorName: 'John Doe',
    description: 'Learn the fundamentals of web development from scratch!',
    lectures: [
      {
        id: 1,
        title: 'Introduction to HTML',
        videoUrl: 'https://www.youtube.com/embed/dD2EISBDjWM', // Demo YouTube video URL
        comments: ['Great intro to HTML!', 'Very helpful.']
      },
      {
        id: 2,
        title: 'CSS Basics',
        videoUrl: 'https://www.youtube.com/embed/1Rs2ND1ryYc', // Another demo YouTube video URL
        comments: ['CSS concepts explained well!', 'Thanks for the lesson.']
      }
    ]
  }
];

const CourseVideoPage = () => {
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [selectedLecture, setSelectedLecture] = useState(null);
  const [newComment, setNewComment] = useState('');
  
  const handleCourseClick = (course) => {
    setSelectedCourse(course);
    setSelectedLecture(course.lectures[0]); // Show the first lecture by default
  };

  const handleLectureClick = (lecture) => {
    setSelectedLecture(lecture);
  };

  const handleCommentChange = (e) => {
    setNewComment(e.target.value);
  };

  const handleCommentSubmit = (e) => {
    e.preventDefault();
    if (newComment.trim()) {
      setSelectedLecture({
        ...selectedLecture,
        comments: [...selectedLecture.comments, newComment]
      });
      setNewComment('');
    }
  };

  return (
    <div className="course-video-page">
      <h2>Your Courses</h2>
      <div className="course-list">
        {coursesData.length > 0 ? (
          coursesData.map(course => (
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
          <p>No courses available.</p>
        )}
      </div>

      {selectedCourse && (
        <div className="lectures-container">
          <h3>Lectures for: {selectedCourse.title}</h3>
          <ul>
            {selectedCourse.lectures.map(lecture => (
              <li
                key={lecture.id}
                onClick={() => handleLectureClick(lecture)}
                className={`lecture-item ${selectedLecture && selectedLecture.id === lecture.id ? 'active' : ''}`}>
                <Button variant="link">{lecture.title}</Button>
              </li>
            ))}
          </ul>

          {selectedLecture && (
            <div className="lecture-video">
              <h4>{selectedLecture.title}</h4>
              <div className="video-container">
                <iframe
                  title={selectedLecture.title}
                  width="100%"
                  height="400px"
                  src={selectedLecture.videoUrl}
                  frameBorder="0"
                  allow=" autoplay;  gyroscope; picture-in-picture"
                  allowFullScreen
                />
              </div>
              <div className="comments-section">
                <h5>Comments</h5>
                <ListGroup>
                  {selectedLecture.comments.map((comment, index) => (
                    <ListGroup.Item key={index}>{comment}</ListGroup.Item>
                  ))}
                </ListGroup>
                <Form onSubmit={handleCommentSubmit}>
                  <Form.Group controlId="newComment">
                    <Form.Control
                      type="text"
                      placeholder="Write a comment"
                      value={newComment}
                      onChange={handleCommentChange}
                    />
                  </Form.Group>
                  <Button type="submit" variant="primary" className="mt-2">
                    Post Comment
                  </Button>
                </Form>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default CourseVideoPage;
