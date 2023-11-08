import React from "react";
import { useRef, useState, useEffect } from "react";
import {
  faCheck,
  faTimes,
  faInfoCircle,
  faUser,
  faLock,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import api from "../api/axiosConfig";
import { Container, Row, Col, Form, Button } from "react-bootstrap";
import "./Register.css";
import { useNavigate } from "react-router-dom";

const LOGIN_URL = "api/v1/auth/authenticate";

const Login = () => {
  const navigate = useNavigate();

  const userRef = useRef<any>();
  const errRef = useRef<any>();

  const [user, setUser] = useState("");
  const [pwd, setPwd] = useState("");

  const [errMsg, setErrMsg] = useState("");
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    setErrMsg("");
  }, [user, pwd]);

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    try {
      const formData = {
        username: user,
        password: pwd,
      };

      const response = await api.post(LOGIN_URL, formData);
      setSuccess(true);
      localStorage.setItem("token", response.data.token);
      navigate("/students");
    } catch (err: any) {
      if (!err?.response) {
        setErrMsg("No Server Response");
      } else if (err.response?.status === 403) {
        setErrMsg("Incorrect credentials");
      } else {
        setErrMsg("Sorry! Something failed");
      }
      errRef.current.focus();
    }
  };

  return (
    <Container fluid className="form-container">
      <Row className="justify-content-center align-items-center vh-100">
        <Col md={6}>
          <div className="shadowed-square">
            {success ? (
              <>
                <h1>Success!</h1>
              </>
            ) : (
              <Form onSubmit={handleSubmit}>
                <p
                  ref={errRef}
                  className={errMsg ? "errmsg" : "offscreen"}
                  aria-live="assertive"
                >
                  {errMsg}
                </p>
                <h3 className="centered mb-4">Sign In</h3>

                <Form.Group>
                  <Form.Label>
                    <FontAwesomeIcon icon={faUser} className="labelIcon" />
                    Username
                  </Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter Username"
                    id="username"
                    ref={userRef}
                    autoComplete="off"
                    onChange={(e) => setUser(e.target.value)}
                    value={user}
                    required
                    aria-describedby="uidnote"
                    className={"mb-3"}
                  />
                </Form.Group>

                <Form.Group>
                  <Form.Label>
                    <FontAwesomeIcon icon={faLock} className="labelIcon" />
                    Password
                  </Form.Label>
                  <Form.Control
                    type="password"
                    placeholder="Enter Password"
                    id="password"
                    onChange={(e) => setPwd(e.target.value)}
                    value={pwd}
                    required
                    aria-describedby="pwdnote"
                    className={"mb-3"}
                  />
                </Form.Group>

                <div className="centered mt-4">
                  <Button type="submit" variant="primary" className="mb-3">
                    Sign In
                  </Button>
                  <p>
                    Do not have an account?
                    <br />
                    <span className="line">
                      {/*put router link here*/}
                      <a href="#">Sign Up</a>
                    </span>
                  </p>
                </div>
              </Form>
            )}
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default Login;
