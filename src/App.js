import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route, Link, useNavigate} from 'react-router-dom';
import './App.css';
import { Container, Row, Col, Button, Card, Form, Breadcrumb } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './styles.css';
import Rewards from './Rewards'; // Import the Rewards component
import logo from './White Garage Logo.png';
import { Animator, ScrollContainer, ScrollPage, Sticky, StickyIn, ZoomIn, batch, Fade, FadeIn, MoveOut } from 'react-scroll-motion';
import Profile from './Profile';
import "./index.css";
import Navbar from './Navbar';
import { motion } from "framer-motion";



// Then use Zoom in your Animator component

const ZoomInScrollOut =batch(StickyIn(),FadeIn(), ZoomIn());

function App() {
  const navigate = useNavigate();
  const text1 = "Hi, Garage Ambassadors !".split(" ");
  const text2 = "Your contribution matters! Swipe down to discover the exciting reward awaiting you.".split(" ");
  const [logoScale, setLogoScale] = useState(1);
  const [contentOpacity, setContentOpacity] = useState(1);
  const [cardPosition, setCardPosition] = useState(0);

  const handleScroll = () => {
    const position = window.pageYOffset;
    const newScale = Math.max(0.5, 1 - position / 500); // Adjust the denominator for speed
    setLogoScale(newScale);

    const newOpacity = Math.max(0, 1 - position / 250); // Adjust as necessary for timing
    setContentOpacity(newOpacity);

    const newPosition = Math.min(position, 200); // Adjust 200 to control how high the card goes
    setCardPosition(newPosition);
  }; // Correctly closes handleScroll function

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []); // Correctly closes useEffect call

  const handleLogin = () => {
    navigate('/Profile'); // Navigate to Profile page
  };

    return (
      <div className="App">
        <Navbar />
        <Routes>
        <Route path="/" element={
        <div className="main-content">
          <ScrollContainer>
            <ScrollPage page={0}>
              <Animator animation={batch(Sticky(), Fade(), MoveOut(0,-200))}>
                <motion.div
                  style={{
                    transform: `translateY(-${cardPosition}px)`, // Move card up based on scroll
                    transition: 'transform 0.5s ease-out' // Smooth transition for the movement
                  }}
                >
                  <Card className="mb-3" style={{ color: "#686A6C", maxHeight: "500px", maxWidth: "1500px", margin: "auto" }}>
                    <motion.div
                      style={{
                        scale: logoScale,
                        transition: { duration: 0.5 }
                      }}
                    >
                      <Card.Img src={logo} />
                    </motion.div>
                    <Card.Body>
                      <motion.div
                        initial={{ opacity: 1 }}
                        animate={{ opacity: contentOpacity }}
                        transition={{ duration: 0.5 }}
                      >
                        <Card.Title style={{ color: 'white', fontSize: '2.0rem' }}>
                          {text1.map((el, i) => (
                            <motion.span initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5, delay: i / 10 }} key={i}>
                              {el}{" "}
                            </motion.span>
                          ))}
                        </Card.Title>
                        <Card.Text style={{ color: 'white', fontSize: '1.3rem' }}>
                          {text2.map((el, i) => (
                            <motion.span initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5, delay: i / 10 }} key={i}>
                              {el}{" "}
                            </motion.span>
                          ))}
                        </Card.Text>
                      </motion.div>
                    </Card.Body>
                  </Card>
                </motion.div>
              </Animator>
            </ScrollPage>

            <ScrollPage page={1}>
              <Animator animation={ZoomInScrollOut}>
                <Rewards />
              </Animator>
            </ScrollPage>   


              <ScrollPage page={2}>
                <Animator animation={ZoomInScrollOut}>                
                  <Form className="Form">
                      <Row>
                      <Col md>
                          <Form.Group controlId="formEmail">
                              <Form.Label>Matric Number</Form.Label>
                              <Form.Control type="email" placeholder="eg. U123456789A" />
                          </Form.Group>
                      </Col>
                      <Col md>
                          <Form.Group controlId="formPassword">
                              <Form.Label>Day of Birth</Form.Label>
                              <Form.Control type="password" placeholder="MMDD" />
                          </Form.Group>
                      </Col>
                      </Row>

                      <Row>
                        <Col>                               
                        <Button variant="secondary" onClick={handleLogin} style={{ color: 'white' }}> 
                        Login 
                        </Button>
                        </Col>
                      </Row>
                                            
                  </Form>
                </Animator>
              
              </ScrollPage>          
                          
            </ScrollContainer>
            </div>  
          } />
              <Route path="/Profile" element={<Profile />} />
            </Routes>
 
        </div>  
    );
}


export default App;

