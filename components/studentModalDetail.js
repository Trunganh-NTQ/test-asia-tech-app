import { Modal, Button } from 'react-bootstrap';

function StudentModalDetail({ show, onClose, student }) {
  return (
    <Modal show={show} onHide={onClose}>
      <Modal.Header closeButton>
        <Modal.Title>Student Detail</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p>Name: {student.name}</p>
        <p>Grade: {student.grade}</p>
        <p>Phone: {student.phone}</p>
        <p>Birthday: {student.birthday}</p>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onClose}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default StudentModalDetail;
