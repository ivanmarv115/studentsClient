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

const USER_REGEX = /^[A-z][A-z0-9-_]{3,23}$/;
const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/;
const REGISTER_URL = "api/v1/auth/register";

const Register = () => {
  const userRef = useRef<any>();
  const errRef = useRef<any>();

  const [user, setUser] = useState("");
  const [validName, setValidName] = useState(false);
  const [userFocus, setUserFocus] = useState(false);

  const [firstName, setFirstName] = useState("");
  const [validFirstName, setValidFirstName] = useState(false);
  const [firstNameFocus, setFirstNameFocus] = useState(false);

  const [lastName, setLastName] = useState("");
  const [validLastName, setValidLastName] = useState(false);
  const [lastNameFocus, setLastNameFocus] = useState(false);

  const [pwd, setPwd] = useState("");
  const [validPwd, setValidPwd] = useState(false);
  const [pwdFocus, setPwdFocus] = useState(false);

  const [matchPwd, setMatchPwd] = useState("");
  const [validMatch, setValidMatch] = useState(false);
  const [matchFocus, setMatchFocus] = useState(false);

  const [errMsg, setErrMsg] = useState("");
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    //setValidName(USER_REGEX.test(user));
    setValidName(USER_REGEX.test(user));
  }, [user]);

  useEffect(() => {
    setValidPwd(PWD_REGEX.test(pwd));
    setValidMatch(pwd === matchPwd);
  }, [pwd, matchPwd]);

  useEffect(() => {
    setErrMsg("");
  }, [user, pwd, matchPwd]);

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    // if button enabled with JS hack
    const v1 = USER_REGEX.test(user);
    const v2 = PWD_REGEX.test(pwd);
    if (!v1 || !v2) {
      setErrMsg("Invalid Entry");
      return;
    }
    try {
      const formData = {
        firstName: firstName,
        lastName: lastName,
        username: user,
        password: pwd,
      };

      const response = await api.post(REGISTER_URL, formData);
      console.log(response?.data);
      console.log(JSON.stringify(response));
      setSuccess(true);
      //clear state and controlled inputs
      //need value attrib on inputs for this
      setFirstName("");
      setLastName("");
      setUser("");
      setPwd("");
      setMatchPwd("");
    } catch (err: any) {
      if (!err?.response) {
        setErrMsg("No Server Response");
      } else if (err.response?.status === 409) {
        setErrMsg("Username Taken");
      } else {
        setErrMsg("Registration Failed");
      }
      errRef.current.focus();
    }
  };

  return (
    <Container fluid className="form-container">
      <Row className="justify-content-center align-items-center vh-100">
        <Col md={6}>
          {success ? (
            <>
              <h1>Success!</h1>
              <p>
                <a href="#">Sign In</a>
              </p>
            </>
          ) : (
            <div className="shadowed-square">
              <Form onSubmit={handleSubmit}>
                <p
                  ref={errRef}
                  className={errMsg ? "errmsg" : "offscreen"}
                  aria-live="assertive"
                >
                  {errMsg}
                </p>
                <h3 className="centered mb-4">Create Account</h3>
                <Form.Group>
                  <Form.Label>
                    <FontAwesomeIcon icon={faUser} className="labelIcon" />
                    First Name
                  </Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter Last Name"
                    id="firstName"
                    autoComplete="off"
                    onChange={(e) => setFirstName(e.target.value)}
                    value={firstName}
                    required
                    aria-invalid={validFirstName ? "false" : "true"}
                    aria-describedby="firstNamenote"
                    onFocus={() => setFirstNameFocus(true)}
                    onBlur={() => setFirstNameFocus(false)}
                    className="mb-3"
                  />
                </Form.Group>

                <Form.Group>
                  <Form.Label>
                    <FontAwesomeIcon icon={faUser} className="labelIcon" />
                    Last Name
                  </Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter Last Name"
                    id="lastName"
                    autoComplete="off"
                    onChange={(e) => setLastName(e.target.value)}
                    value={lastName}
                    required
                    aria-invalid={validLastName ? "false" : "true"}
                    aria-describedby="lastNamenote"
                    onFocus={() => setLastNameFocus(true)}
                    onBlur={() => setLastNameFocus(false)}
                    className="mb-3"
                  />
                </Form.Group>

                <Form.Group>
                  <Form.Label>
                    <FontAwesomeIcon icon={faUser} className="labelIcon" />
                    Username
                  </Form.Label>
                  <FontAwesomeIcon
                    icon={faCheck}
                    className={validName ? "valid" : "hide"}
                  />
                  <FontAwesomeIcon
                    icon={faTimes}
                    className={validName || !user ? "hide" : "invalid"}
                  />
                  <Form.Control
                    type="text"
                    placeholder="Enter Username"
                    id="username"
                    ref={userRef}
                    autoComplete="off"
                    onChange={(e) => setUser(e.target.value)}
                    value={user}
                    required
                    aria-invalid={validName ? "false" : "true"}
                    aria-describedby="uidnote"
                    onFocus={() => setUserFocus(true)}
                    onBlur={() => setUserFocus(false)}
                    className={validName || !user ? "mb-3" : ""}
                  />
                  <Form.Text
                    id="uidnote"
                    className={
                      "text-muted" + userFocus && user && !validName
                        ? "instructions"
                        : "hide"
                    }
                  >
                    4 to 24 characters.
                    <br />
                    Must begin with a letter.
                    <br />
                    Letters, numbers, underscores, hyphens allowed.
                    <br className="mb-3" />
                  </Form.Text>
                </Form.Group>

                <Form.Group>
                  <Form.Label>
                    <FontAwesomeIcon icon={faLock} className="labelIcon" />
                    Password
                  </Form.Label>
                  <FontAwesomeIcon
                    icon={faCheck}
                    className={validPwd ? "valid" : "hide"}
                  />
                  <FontAwesomeIcon
                    icon={faTimes}
                    className={validPwd || !pwd ? "hide" : "invalid"}
                  />
                  <Form.Control
                    type="password"
                    placeholder="Enter Password"
                    id="password"
                    onChange={(e) => setPwd(e.target.value)}
                    value={pwd}
                    required
                    aria-invalid={validPwd ? "false" : "true"}
                    aria-describedby="pwdnote"
                    onFocus={() => setPwdFocus(true)}
                    onBlur={() => setPwdFocus(false)}
                    className={validPwd || !pwd ? "mb-3" : ""}
                  />
                  <Form.Text
                    id="pwdnote"
                    className={
                      "text-muted" + pwdFocus && pwd && !validPwd
                        ? "instructions"
                        : "hide"
                    }
                  >
                    8 to 24 characters.
                    <br />
                    Must include uppercase and lowercase letters, a number and a
                    special character.
                    <br />
                    Allowed special characters:{" "}
                    <span aria-label="exclamation mark">!</span>{" "}
                    <span aria-label="at symbol">@</span>{" "}
                    <span aria-label="hashtag">#</span>{" "}
                    <span aria-label="dollar sign">$</span>{" "}
                    <span aria-label="percent">%</span>
                  </Form.Text>
                </Form.Group>

                <Form.Group>
                  <Form.Label>
                    <FontAwesomeIcon icon={faLock} className="labelIcon" />
                    Confirm Password
                  </Form.Label>
                  <FontAwesomeIcon
                    icon={faCheck}
                    className={validMatch && matchPwd ? "valid" : "hide"}
                  />
                  <FontAwesomeIcon
                    icon={faTimes}
                    className={validMatch || !matchPwd ? "hide" : "invalid"}
                  />
                  <Form.Control
                    type="password"
                    placeholder="Confirm Password"
                    id="confirm_pwd"
                    onChange={(e) => setMatchPwd(e.target.value)}
                    value={matchPwd}
                    required
                    aria-invalid={validMatch ? "false" : "true"}
                    aria-describedby="confirmnote"
                    onFocus={() => setMatchFocus(true)}
                    onBlur={() => setMatchFocus(false)}
                    className={validMatch || !matchPwd ? "mb-3" : ""}
                  />
                  <Form.Text
                    id="confirmnote"
                    className={
                      "text-muted" + matchFocus && !validMatch
                        ? "instructions"
                        : "hide"
                    }
                  >
                    Must match the first password input field.
                  </Form.Text>
                </Form.Group>
                <div className="centered mt-4">
                  <Button
                    disabled={
                      !validName || !validPwd || !validMatch ? true : false
                    }
                    type="submit"
                    variant="primary"
                    className="mb-3"
                  >
                    Sign Up
                  </Button>
                  <p>
                    Already registered?
                    <br />
                    <span className="line">
                      {/*put router link here*/}
                      <a href="#">Sign In</a>
                    </span>
                  </p>
                </div>
              </Form>
            </div>
          )}
        </Col>
      </Row>
    </Container>
  );
};

export default Register;
