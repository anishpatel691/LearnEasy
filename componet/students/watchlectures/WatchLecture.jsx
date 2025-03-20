import React, { useEffect, useState } from "react";
import { useParams, useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import { Container, Row, Col, Card, ListGroup, Form, Button, Modal } from "react-bootstrap";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import "./WatchLecture.css";

const WatchLecture = () => {
  const { lectureId } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const { videoUrl, courseId } = location.state || {};
  const [courseid, setCourseId] = useState(courseId);
  const [lecture, setLecture] = useState(null);
  const [upcomingLectures, setUpcomingLectures] = useState([]);
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");
  const [newVideoUrl, setNewVideoUrl] = useState("");
  const [key, setKey] = useState(0);
  const [loading, setLoading] = useState(true); // Loading state

  // Notepad State
  const [showNotepad, setShowNotepad] = useState(false);
  const [notes, setNotes] = useState(localStorage.getItem(`notes-${lectureId}`) || "");
  const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001';

  useEffect(() => {
    const fetchLectureDetails = async () => {
      try {
        if (!courseId?.courseid) return;

        const { data } = await axios.get(`${API_URL}/api/courses/${courseid.courseid}`);
        if (!data.lectures || data.lectures.length === 0) return;

        const foundLecture = data.lectures.find((lec) => lec._id === lectureId);
        if (!foundLecture) {
          setLecture(null);
          return;
        }

        setLecture(foundLecture);
        setUpcomingLectures(data.lectures.filter((lec) => lec._id !== lectureId));
        setNewVideoUrl(foundLecture.videoUrl);
        setComments(data.comments || []);
      } catch (error) {
        console.error("Error fetching lecture details:", error);
      } finally {
        setLoading(false); // Stop loading
      }
    };

    fetchLectureDetails();
  }, [lectureId, courseId?.courseid]);

  const handleCommentSubmit = async (e) => {
    e.preventDefault();
    if (!newComment.trim()) return;

    try {
      const { data } = await axios.post(`/api/comments/add`, { lectureId, text: newComment });
      setComments((prev) => [...prev, data]);
      setNewComment("");
    } catch (error) {
      console.error("Error adding comment:", error);
    }
  };

  const handleSaveNotes = () => {
    localStorage.setItem(`notes-${lectureId}`, notes);
    setShowNotepad(true);
  };

  if (!lecture && !loading) return <h2 className="text-center text-danger mt-5">Lecture not found!</h2>;

  return (
    <Container fluid key={key} className="watch-lecture-container">
      <div className="back_btn_container">
        <Button size="md" onClick={() => navigate('/s/courses/67b1eb44509975bdd8173a23')}>
          ← Back
        </Button>
      </div>
      <Row className="justify-content-center">
        {/* Video Player Section */}
        <Col lg={8} className="video-section">
          <Card className="video-card">
            <Card.Body>
              <div className="video-wrapper">
                {loading ? (
                  <Skeleton className="skeleton-thumbnail skeleton-shimmer" />  
                ) : (
                  <video controls className="video-player">
                    <source src={newVideoUrl} type="video/mp4" />
                    Your browser does not support the video tag.
                  </video>
                )}
              </div>
              <hr className="hr" />
              <h4 className="video-title">
                {loading ?  <Skeleton className="skeleton-title skeleton-shimmer" /> : `Title: ${lecture.title}`}
              </h4>
              <p className="video-description">
                {loading ?  <Skeleton className="skeleton-description skeleton-shimmer" count={2}  /> : lecture.description}
              </p>
            </Card.Body>
          </Card>

          {/* Comments Section */}
          <Card className="mt-2 comments-card">
            <Card.Body>
              <h5>Comments</h5>
              <ListGroup className="mb-3">
                {loading ? (
                  <>
                  <div className="d-flex align-items-center mb-2">
                    <Skeleton className="skeleton-profile skeleton-shimmer" />
                    <Skeleton className="skeleton-comment skeleton-shimmer" />
                  </div>
                  <div className="d-flex align-items-center mb-2">
                    <Skeleton className="skeleton-profile skeleton-shimmer" />
                    <Skeleton className="skeleton-comment skeleton-shimmer" />
                  </div>
                </>
                ) : comments.length === 0 ? (
                  <p>No comments yet.</p>
                ) : (
                  comments.map((c, i) => <ListGroup.Item key={i}>{c.text}</ListGroup.Item>)
                )}
              </ListGroup>
              <Form onSubmit={handleCommentSubmit}>
                <Form.Group className="comment-form">
                  <Form.Control type="text" value={newComment} onChange={(e) => setNewComment(e.target.value)} placeholder="Write a comment..." />
                </Form.Group>
                <Button type="submit" variant="primary" className="mt-2 comment-btn">
                  Post Comment
                </Button>
              </Form>
            </Card.Body>
          </Card>
        </Col>

        {/* Sidebar for Upcoming Lectures */}
        <Col lg={4} className="upcoming-lectures">
          <h5>Next Lectures</h5>
          <ListGroup>
            {loading ? (
          <>
          <Skeleton className="skeleton-title skeleton-shimmer" />
          <Skeleton className="skeleton-description skeleton-shimmer" />
          <Skeleton className="skeleton-title skeleton-shimmer" />
        </>
            ) : upcomingLectures.length > 0 ? (
              upcomingLectures.map((lec, index) => (
                <ListGroup.Item key={lec._id} className="lecture-item">
                  <strong>{index + 1}. {lec.title}</strong>
                  <Button
                    variant="primary"
                    onClick={() => {
                      setKey((prevKey) => prevKey + 1);
                      navigate(`/s/lectures/${courseId.courseid}/${lec._id}`, { state: { videoUrl: lec.videoUrl, courseId } });
                    }}
                    className="w-100 mt-2"
                  >
                    Watch Lecture
                  </Button>
                </ListGroup.Item>
              ))
            ) : (
              <p>No upcoming lectures.</p>
            )}
          </ListGroup>
        </Col>
      </Row>

      {/* Notepad Modal */}
      <Modal show={showNotepad} onHide={() => setShowNotepad(false)}>
        <Modal.Title>📒 My Notes</Modal.Title>
        <Modal.Body>
          <Form.Control        
            as="textarea" 
            rows={6} 
            value={notes} 
            onChange={(e) => setNotes(e.target.value)} 
            placeholder="Write your notes here..."
            style={{ width: "50%", margin: "0px 320px" }}
          />
        </Modal.Body>
        <Modal.Footer>
          <Button style={{ width: "20%", margin: "0px 350px", color: "black" }} variant="secondary" onClick={() => setShowNotepad(false)}>Close</Button>
          <Button style={{ width: "20%", margin: "0px -250px", color: "black" }} variant="primary" onClick={handleSaveNotes}>Save Notes</Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
};

export default WatchLecture;
