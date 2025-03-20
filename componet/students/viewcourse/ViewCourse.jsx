import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { Container, Row, Col, Card, Button, ListGroup, Spinner } from "react-bootstrap";
import './ViewCourse.css';

const ViewCourse = () => {
  const { courseId } = useParams();
  const navigate = useNavigate(); // Hook for navigation
  const [course, setCourse] = useState(null);
  const [lectures, setLectures] = useState([]);
  const [courseid, setCourseId] = useState("");
  const [loading, setLoading] = useState(true);
  const [isEnrolled, setIsEnrolled] = useState(false); // Track enrollment status
  const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001';

  useEffect(() => {
    const fetchCourseDetails = async () => {
      try {
        // Fetch course details
        const { data } = await axios.get(`${API_URL}/api/courses/${courseId}`);
        setCourse(data);
        setCourseId(data._id);
        console.log("ll",data._id);
        
        setLectures(data.lectures);

        // Check if the user is enrolled
        const enrolledRes = await axios.get(`${API_URL}/api/users/enrolled-courses`);
        const enrolledCourses = enrolledRes.data;

        // Check if courseId exists in user's enrolled courses
        setIsEnrolled(enrolledCourses.includes(courseId));
      } catch (error) {
        console.error("Error fetching course details:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCourseDetails();
  }, [courseId]);

  const handleEnroll = async () => {
    try {
      await axios.post(`${API_URL}/api/enroll/${courseId}`); // Backend API to enroll user
      setIsEnrolled(true);
    } catch (error) {
      console.error("Error enrolling in course:", error);
    }
  };

  if (loading) {
    return (
      <div className="text-center mt-5">
      <div className="loader"></div>

      </div>
    );
  }

  if (!course) {
    return <h2 className="text-center text-danger mt-5">Course not found!</h2>;
  }

  return (
    <Container className="mt-4">
  {/* Back Button (Top Left Corner, Medium Size) */}
<div className="back_btn_container2">
  <Button size="md" onClick={() => navigate("/courses")}>
    ← Back
  </Button>
</div>

      <Row>
        {/* Course Details */}
        <Col md={8}>
          <Card>
            <Card.Img variant="top" src={course.thumbnail} className="course-img  course_img" />
            <Card.Body>
              <Card.Title>{course.title}</Card.Title>
              <Card.Text>{course.description}</Card.Text>
              <p>
                <strong>Instructor:</strong> {course.instructor}
              </p>
              <p>
                <strong>Category:</strong> {course.category}
              </p>
              <p>
                <strong>Price:</strong> {course.price === 0 ? "Free" : `₹${course.price}`}
              </p>

              {!isEnrolled && (
                <Button variant="success" onClick={handleEnroll} className="w-100">
                  Enroll Now
                </Button>
              )}
            </Card.Body>
          </Card>
        </Col>

        {/* Lecture List */}
        <Col md={4}>
          <h4>Lectures ({lectures.length})</h4>
          {lectures.length === 0 ? (
            <p>No lectures available for this course.</p>
          ) : isEnrolled ? (
            <p className="text-danger text-center">Enroll to access lectures.</p>
          ) : (
           
            <ListGroup>
              {lectures.map((lecture, index) => (
                <ListGroup.Item key={lecture._id}>
                  <strong>{index + 1}. {lecture.title}</strong>
                  <p>{lecture.description}</p>
                  {console.log("hjhjk",lectures)
                  }
                  <Button
  variant="primary"
  onClick={() => navigate(`/s/lectures/${courseid}/${lecture._id}`, { 
    state: { 
      videoUrl: lecture.videoUrl, 
      courseId: {courseid}
    } 
  })}
  
  className="w-100"
>
  Watch Lecture
</Button>

                </ListGroup.Item>
              ))}
            </ListGroup>
          )}
        </Col>
      </Row>
    </Container>
  );
};

export default ViewCourse;
