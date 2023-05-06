import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useState, useEffect } from 'react';
import { get, deleteRecord, updateRecord, createRecord } from '../utils/api';
import { Table, Button, Modal, Form } from 'react-bootstrap';
import { Pagination } from 'react-bootstrap';
import PaginationItem from 'react-bootstrap-pagination';
import SearchForm from '../components/searchForm';
import StudentModalDetail from '../components/studentModalDetail';
import StudentModalForm from '../components/studentModalForm';

function Students() {
  const DEFAULT_STATE = {
    id: '',
    name: '',
    grade: '',
    phone: '',
    birthday: '',
  };

  const router = useRouter();
  const [students, setStudents] = useState([]);
  const [meta, setMeta] = useState({});
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [showUpdateModal, setShowUpdateModal] = useState(false);
  const [isUpdate, setIsUpdate] = useState(false);
  const [studentFormData, setStudentFormData] = useState(DEFAULT_STATE);
  const [searchQuery, setSearchQuery] = useState({
    name_matchesq: '',
    grade_eq: '',
  });

  const grades = [null, 6, 7, 8, 9];

  useEffect(() => {
    const fetchStudents = async () => {
      const data = await get('/students');
      setStudents(data.data);
      setMeta(data.meta);
      setLoading(false);
    };
    fetchStudents();
  }, []);

  const handleShowDetail = (student) => {
    setSelectedStudent(student);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setShowUpdateModal(false);
  };

  const handleShowUpdate = (student) => {
    setStudentFormData(student);
    setIsUpdate(true);
    setShowUpdateModal(true);
  };

  const handleShowCreate = () => {
    setStudentFormData(DEFAULT_STATE);
    setIsUpdate(false);
    setShowUpdateModal(true);
  };

  const handleDelete = async (studentId) => {
    await deleteRecord(`/students/${studentId}`);
    setStudents((prevStudents) =>
      prevStudents.filter((student) => student.id !== studentId)
    );
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setStudentFormData((prevFormData) => ({ ...prevFormData, [name]: value }));
  };

  const handleUpdate = async () => {
    if (isUpdate) {
      await updateRecord(`/students/${studentFormData.id}`, studentFormData);

      setStudents(
        students.map((student) => {
          if (student.id === studentFormData.id) {
            return {
              id: student.id,
              name: studentFormData.name,
              grade: studentFormData.grade,
              phone: studentFormData.phone,
              birthday: studentFormData.birthday,
            };
          } else {
            return student;
          }
        })
      );
    } else {
      if (await createRecord(`/students`, studentFormData)) {
        const data = await get('/students');
        setStudents(data.data);
      }
    }

    setShowUpdateModal(false);
  };

  const handleSearchChange = async (event) => {
    const { name, value } = event.target;
    setSearchQuery((prevFormData) => ({
      ...prevFormData,
      [name]: value === 'all' ? null : value,
    }));
  };

  const handleSearch = async () => {
    setLoading(true);
    const data = await get('/students', searchQuery);
    setStudents(data.data);
    setLoading(false);
  };

  return (
    <div>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <div>
          <SearchForm
            searchQuery={searchQuery}
            handleSearchChange={handleSearchChange}
            handleSearch={handleSearch}
            handleShowCreate={handleShowCreate}
            grades={grades}
          />

          <Table striped bordered hover>
            <thead>
              <tr>
                <th>Name</th>
                <th>Grade</th>
                <th>Phonenumber</th>
                <th>Birthday</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {students.map((student) => (
                <tr key={student.id}>
                  <td>{student.name}</td>
                  <td>{student.grade}</td>
                  <td>{student.phone}</td>
                  <td>{student.birthday}</td>
                  <td className="text-center">
                    <Button
                      variant="info"
                      size="sm"
                      onClick={() => handleShowDetail(student)}
                    >
                      Show Detail
                    </Button>
                    <span style={{ padding: '5px' }}> | </span>
                    <Button
                      variant="success"
                      size="sm"
                      onClick={() => handleShowUpdate(student)}
                    >
                      Update
                    </Button>
                    <span style={{ padding: '5px' }}> | </span>
                    <Button
                      variant="danger"
                      size="sm"
                      onClick={() => handleDelete(student.id)}
                    >
                      Delete
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>

          {selectedStudent && (
            <StudentModalDetail
              show={showModal}
              onClose={handleCloseModal}
              student={selectedStudent}
            />
          )}

          {studentFormData && (
            <StudentModalForm
              showUpdateModal={showUpdateModal}
              setShowUpdateModal={setShowUpdateModal}
              studentFormData={studentFormData}
              handleChange={handleChange}
              grades={grades}
              handleUpdate={handleUpdate}
            />
          )}
        </div>
      )}
    </div>
  );
}

export default Students;
