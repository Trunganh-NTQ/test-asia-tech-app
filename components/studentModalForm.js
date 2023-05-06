import { Button, Modal, Form } from 'react-bootstrap';
import DatePicker from 'react-datepicker';

function StudentModalForm(props) {
  const {
    showUpdateModal,
    setShowUpdateModal,
    studentFormData,
    handleChange,
    grades,
    handleUpdate,
  } = props;

  return (
    <Modal show={showUpdateModal} onHide={() => setShowUpdateModal(false)}>
      <Modal.Header closeButton>
        <Modal.Title>Update Student</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group controlId="formName">
            <Form.Label>Name</Form.Label>
            <Form.Control
              type="text"
              name="name"
              value={studentFormData.name}
              onChange={handleChange}
            />
          </Form.Group>
          <Form.Group controlId="formGrade">
            <Form.Label>Grade</Form.Label>
            <Form.Select
              name="grade"
              value={studentFormData.grade}
              onChange={handleChange}
            >
              {grades.map((grade) => (
                <option key={grade} value={grade}>
                  {grade}
                </option>
              ))}
            </Form.Select>
          </Form.Group>
          <Form.Group controlId="formPhone">
            <Form.Label>Phone</Form.Label>
            <Form.Control
              type="text"
              name="phone"
              value={studentFormData.phone}
              onChange={handleChange}
            />
          </Form.Group>
          <Form.Group controlId="formPhone">
            <Form.Label>Birthday</Form.Label>
            <DatePicker
              className="form-control"
              selected={
                !isNaN(Date.parse(studentFormData.birthday))
                  ? new Date(studentFormData.birthday)
                  : null
              }
              onChange={(date) =>
                setStudentFormData((prevFormData) => ({
                  ...prevFormData,
                  birthday: date.toISOString(),
                }))
              }
            />
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={() => setShowUpdateModal(false)}>
          Cancel
        </Button>
        <Button variant="primary" onClick={handleUpdate}>
          Save Changes
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default StudentModalForm;
