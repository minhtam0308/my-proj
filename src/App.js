
import { Link, Outlet } from 'react-router-dom';
import './App.scss';
import Header from './component/Header/Header';

const App = () => {
  return (
    <div className="app-container">
      <div className='Header-contain'>
        <Header />
      </div>
      <div className='content'>
        <div className='slidenav-contain'>

        </div>
        <div className='appp-content'>
          <Outlet />
        </div>
      </div>

    </div>
  );
}

export default App;
