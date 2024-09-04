import './App.css';
import "reactflow/dist/style.css";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import AppRouter from './router/NoStressRoutes';
import 'react-date-range/dist/styles.css'; // main style file
import 'react-date-range/dist/theme/default.css'; // theme css file
import "react-datepicker/dist/react-datepicker.css";
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/js/bootstrap.js';
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import './constants.css'


function App(props) {
  return (
    <>
      <div className='App'>
        <AppRouter /> 
      </div>
    </>
  );
}

export default App;
