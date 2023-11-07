import Header from "./components/Header";
import StudentsPage from "./components/StudentsPage";
import api from "./api/axiosConfig";
import { useState, useEffect } from "react";
import Register from "./components/Register";
import Login from "./components/login";

export type Students = {
  id?: Number;
  firstName: String;
  lastName: String;
  course: String;
  dateOfBirth: String;
};

const App = () => {
  const [students, setStudents] = useState<Students | null>(null);

  const getStudents = async () => {
    try {
      const response = await api.get("/students");
      setStudents(response.data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getStudents();
  }, []);

  return (
    <Login />
    /*
    <div>
      <Header />
      <StudentsPage />
    </div>
    */
  );
};

export default App;
