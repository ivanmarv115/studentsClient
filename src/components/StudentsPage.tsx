import "./StudentsPage.css";
import { Table, Form, Row, Col, Container } from "react-bootstrap";
import { Students } from "../App";
import api from "../api/axiosConfig";
import { useState, useEffect } from "react";
import FilterComponent from "./SearchBy";
import AddStudentForm from "./AddStudentForm";
import StudentsList from "./StudentsList";
import { useNavigate } from "react-router-dom";

const StudentsPage = (): JSX.Element => {
  const navigate = useNavigate();

  //List of students from api
  const [students, setStudents] = useState<Students[]>([]);

  //For add student input
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [course, setCourse] = useState("");
  const [dot, setDot] = useState("");

  const [firstNameEdit, setFirstNameEdit] = useState("");
  const [lastNameEdit, setLastNameEdit] = useState("");
  const [courseEdit, setCourseEdit] = useState("");
  const [dotEdit, setDotEdit] = useState("");

  const [firstNameSearch, setFirstNameSearch] = useState("");
  const [lastNameSearch, setLastNameSearch] = useState("");
  const [courseSearch, setCourseSearch] = useState("");

  //Tells which rows are being in edition
  const [edit, setEdit] = useState(false);
  const [editId, setEditId] = useState<any>();

  const getStudents = async () => {
    try {
      const token = localStorage.getItem("token");
      if (token !== null && token !== "") {
        console.log(token);
        const response = await api.get("/students", {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        });
        setStudents(response.data);
      } else {
        navigate("/");
      }
    } catch (err: any) {
      console.log("error:" + err);
      if (err.response?.status === 403) {
        localStorage.setItem("token", "");
        navigate("/");
      }
    }
  };

  /*
  --- SEARCH ---
*/

  const handleSearchChange = (value: string, name: string) => {
    if (name == "firstNameSearch") setFirstNameSearch(value);
    else if (name == "lastNameSearch") setLastNameSearch(value);
    else if (name == "courseSearch") setCourseSearch(value);
  };

  const handleSearchSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    try {
      const formData = {
        firstName: firstNameSearch,
        lastName: lastNameSearch,
        course: courseSearch,
      };
      const response = await api.get("/students/by", { params: formData });
      setStudents(response.data);
      console.log(response);
    } catch (err) {
      console.log(err);
    }
  };

  /*
  --- EDIT ---
*/
  const handleEditChange = (value: string, name: string) => {
    if (name == "firstNameEdit") setFirstNameEdit(value);
    else if (name == "lastNameEdit") setLastNameEdit(value);
    else if (name == "courseEdit") setCourseEdit(value);
    else if (name == "dotEdit") setDotEdit(value);
  };

  const handleEdit = (id: number, student: any) => {
    setEdit(true);
    setEditId(id);

    setFirstNameEdit(student.firstName);
    setLastNameEdit(student.lastName);
    setCourseEdit(student.course);
    setDotEdit(student.dateOfBirth);

    console.log(edit, editId);
  };

  const handleCancelEdit = () => {
    setEdit(false);
    setEditId(null);
  };

  const handleSave = async (event: any, id: number) => {
    event.preventDefault();

    const formData = {
      id: id,
      firstName: firstNameEdit,
      lastName: lastNameEdit,
      course: courseEdit,
      dateOfBirth: dotEdit,
    };

    const response = await api.post("/students", formData);

    setEdit(false);
    setEditId(null);

    getStudents();

    console.log(response);
  };

  /*
  --- ADD ---
*/

  const handleAddChange = (value: string, name: string) => {
    if (name == "firstNameAdd") setFirstName(value);
    else if (name == "lastNameAdd") setLastName(value);
    else if (name == "courseAdd") setCourse(value);
    else if (name == "dotAdd") setDot(value);
  };

  const addStudent = async (event: any) => {
    event.preventDefault();

    const formData = {
      firstName: firstName,
      lastName: lastName,
      course: course,
      dateOfBirth: dot,
    };

    const response = await api.post("/students", formData);

    console.log(response);

    getStudents();

    fillBlankInputs();
  };

  const fillBlankInputs = () => {
    setFirstName("");
    setLastName("");
    setCourse("");
    setDot("");
  };

  /*
  --- DELETE ---
*/

  const deleteStudent = async (id: Number) => {
    try {
      const response = await api.delete("/students", { data: { id: id } });
      console.log(response);
      getStudents();
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getStudents();
  }, []);

  //RETURN
  return (
    <Container fluid>
      <Row>
        <Col md={2}>
          <FilterComponent
            firstNameSearch={firstNameSearch}
            lastNameSearch={lastNameSearch}
            courseSearch={courseSearch}
            handleSearchChange={handleSearchChange}
            handleSearchSubmit={handleSearchSubmit}
          />
        </Col>
        <Col>
          <Form onSubmit={addStudent}>
            <Table striped bordered hover>
              <thead>
                <tr>
                  <th>First Name</th>
                  <th>Last Name</th>
                  <th>Course</th>
                  <th>Date of Birth</th>
                </tr>
              </thead>
              <tbody>
                <AddStudentForm
                  firstName={firstName}
                  lastName={lastName}
                  course={course}
                  dot={dot}
                  handleAddChange={handleAddChange}
                />
                <StudentsList
                  students={students}
                  editId={editId}
                  firstNameEdit={firstNameEdit}
                  lastNameEdit={lastNameEdit}
                  courseEdit={courseEdit}
                  dotEdit={dotEdit}
                  editChangeHandler={handleEditChange}
                  editHandler={handleEdit}
                  cancelEditHandler={handleCancelEdit}
                  deleteHandler={deleteStudent}
                  saveHandler={handleSave}
                />
              </tbody>
            </Table>
          </Form>
        </Col>
      </Row>
    </Container>
  );
};

export default StudentsPage;
