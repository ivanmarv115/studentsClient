import { Form, Button } from "react-bootstrap";
import { Students } from "../App";

interface Props {
  students: Students[];
  editId: number;

  firstNameEdit: string;
  lastNameEdit: string;
  courseEdit: string;
  dotEdit: string;
  editChangeHandler: (value: string, name: string) => void;

  editHandler: (id: number, student: Students) => void;
  deleteHandler: (id: number) => void;
  cancelEditHandler: () => void;
  saveHandler: (event: any, id: number) => void;
}

const StudentsList = (props: Props) => {
  return props.students?.map((student: any) => {
    return (
      <>
        {!(props.editId === student.id) ? (
          <tr key={student.id}>
            <td>{student.firstName}</td>
            <td>{student.lastName}</td>
            <td>{student.course}</td>
            <td>{student.dateOfBirth}</td>
            <td className="text-center">
              <Button
                variant="secondary button-spacing"
                onClick={() => props.editHandler(student.id, student)}
              >
                Edit
              </Button>
              <Button
                variant="danger button-spacing"
                onClick={() => props.deleteHandler(student.id)}
              >
                Delete
              </Button>
            </td>
          </tr>
        ) : (
          <tr key={student.id}>
            <td>
              <Form.Control
                type="text"
                className="firstNameEditInput"
                id="firstNameEditInput"
                placeholder={student.firstName}
                value={props.firstNameEdit}
                onChange={(e) =>
                  props.editChangeHandler(e.target.value, e.target.name)
                }
              />
            </td>
            <td>
              <Form.Control
                type="text"
                className="form-control"
                id="lastNameEditInput"
                placeholder={student.lastName}
                value={props.lastNameEdit}
                onChange={(e) =>
                  props.editChangeHandler(e.target.value, e.target.name)
                }
              />
            </td>
            <td>
              <Form.Control
                type="text"
                className="form-control"
                id="courseEditInput"
                placeholder={student.course}
                value={props.courseEdit}
                onChange={(e) =>
                  props.editChangeHandler(e.target.value, e.target.name)
                }
              />
            </td>
            <td>
              <Form.Control
                type="text"
                className="form-control"
                id="dotEditInput"
                placeholder={student.dateOfBirth}
                value={props.dotEdit}
                onChange={(e) =>
                  props.editChangeHandler(e.target.value, e.target.name)
                }
              />
            </td>
            <td className="text-center">
              <Button
                variant="secondary button-spacing"
                onClick={props.cancelEditHandler}
              >
                Cancel
              </Button>
              <Button
                variant="secondary button-spacing"
                onClick={(e) => props.saveHandler(e, student.id)}
              >
                Save
              </Button>
            </td>
          </tr>
        )}
      </>
    );
  });
};

export default StudentsList;
