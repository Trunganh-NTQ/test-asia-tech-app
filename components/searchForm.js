import { Form, Button } from 'react-bootstrap';

function SearchForm({ searchQuery, handleSearchChange, handleSearch, handleShowCreate, grades }) {
  return (
    <div className="my-3 d-flex justify-content-between">
      <Form inline className="d-flex w-50">
        <Form.Control
          type="text"
          placeholder="Search"
          className="mr-sm-2 mr-2"
          name="name_matchesq"
          value={searchQuery.name_matchesq}
          onChange={handleSearchChange}
        />
        <Form.Select
          aria-label="Select a grade"
          className="mx-2 w-25"
          name="grade_eq"
          value={searchQuery.grade_eq}
          onChange={handleSearchChange}
        >
          {grades.map((grade) => (
            <option key={grade} value={grade ?? null}>
              {grade ?? 'all'}
            </option>
          ))}
        </Form.Select>
        <Button variant="outline-info" onClick={() => handleSearch()}>
          Search
        </Button>
      </Form>

      <Button variant="outline-danger" onClick={() => handleShowCreate()}>
        Create
      </Button>
    </div>
  );
}

export default SearchForm;