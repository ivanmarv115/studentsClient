import React from "react";
import { Form, Button } from "react-bootstrap";

interface Props {
  firstNameSearch: string;
  lastNameSearch: string;
  courseSearch: string;
  handleSearchChange: (value: string, name: string) => void;
  handleSearchSubmit: (event: React.FormEvent) => void;
}

const FilterComponent = (props: Props) => {
  return (
    <>
      <h3>Filters</h3>
      <Form onSubmit={props.handleSearchSubmit}>
        <Form.Group className="mb-3" controlId="filterFirstName">
          <Form.Label>First Name</Form.Label>
          <Form.Control
            type="text"
            value={props.firstNameSearch}
            onChange={(e) =>
              props.handleSearchChange(e.target.value, e.target.name)
            }
            name="firstNameSearch"
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="filterLastName">
          <Form.Label>Last Name</Form.Label>
          <Form.Control
            type="text"
            value={props.lastNameSearch}
            onChange={(e) =>
              props.handleSearchChange(e.target.value, e.target.name)
            }
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="filterCourse">
          <Form.Label>Course</Form.Label>
          <Form.Control
            type="text"
            value={props.courseSearch}
            onChange={(e) =>
              props.handleSearchChange(e.target.value, e.target.name)
            }
          />
        </Form.Group>
        <Button variant="secondary button-spacing" type="submit">
          Search
        </Button>
      </Form>
    </>
  );
};

export default FilterComponent;
