import './App.css';
import { MainDashboard } from './components/MainDashboard/MainDashboard';
import { Sidebar } from './components/Sidebar/Sidebar';

function App() {
  return (
    <div className="App">
      <div className='AppMain'>
        <Sidebar></Sidebar>
        <MainDashboard></MainDashboard>
      </div>
    </div>
  );
}

export default App;
