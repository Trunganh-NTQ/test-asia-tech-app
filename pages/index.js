import Students from './students';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'react-datepicker/dist/react-datepicker.css';

export default function Home() {
  return (
    <div className="container">
      <h1>Student List</h1>
      <Students />
    </div>
  );
}
