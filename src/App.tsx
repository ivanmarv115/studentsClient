import Header from "./components/Header";
import StudentsPage from "./components/StudentsPage";
import Register from "./components/Register";
import Login from "./components/Login";
import { BrowserRouter, Route, Routes } from "react-router-dom";

export type Students = {
  id?: Number;
  firstName: String;
  lastName: String;
  course: String;
  dateOfBirth: String;
};

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/students" element={<StudentsPage />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
