import { Form, Button } from "react-bootstrap";

interface Props {
  firstName: string;
  lastName: string;
  course: string;
  dot: string;
  handleAddChange: (value: string, name: string) => void;
}

const AddStudentForm = (props: Props) => {
  return (
    <tr>
      <td>
        <Form.Control
          type="text"
          name="firstNameAdd"
          placeholder="First Name"
          value={props.firstName}
          onChange={(e) => props.handleAddChange(e.target.value, e.target.name)}
        />
      </td>
      <td>
        <Form.Control
          type="text"
          name="lastNameAdd"
          placeholder="Last Name"
          value={props.lastName}
          onChange={(e) => props.handleAddChange(e.target.value, e.target.name)}
        />
      </td>
      <td>
        <Form.Control
          type="text"
          className="form-control"
          name="courseAdd"
          placeholder="Course"
          value={props.course}
          onChange={(e) => props.handleAddChange(e.target.value, e.target.name)}
        />
      </td>
      <td>
        <Form.Control
          type="text"
          className="form-control"
          name="dotAdd"
          placeholder="Date of Birth"
          value={props.dot}
          onChange={(e) => props.handleAddChange(e.target.value, e.target.name)}
        />
      </td>
      <td className="text-center">
        <Button type="submit" variant="success">
          Add
        </Button>
      </td>
    </tr>
  );
};

export default AddStudentForm;
