import './App.css';
import { MainDashboard } from './Pages/MainDashboard/MainDashboard';
import { UserPage } from './Pages/UserPage/UserPage';
import { UserDetail } from './Pages/UserDetail/UserDetail';

import { NewsPaper } from './Pages/NewsPaper/NewsPaper';
import { NewsPaperDetail } from './Pages/NewsPaperDetail/NewsPaperDetail';
import { NewsPaperAdd } from './Pages/NewsPaperAdd/NewsPaperAdd';
import { NewsPaperEdit } from './Pages/NewsPaperEdit/NewsPaperEdit';

import { News } from './Pages/News/News';
import { NewsDetail } from './Pages/NewsDetail/NewsDetail';
import { Login } from './Pages/Login/Login';
import { Sidebar } from './components/Sidebar/Sidebar';
import { Routes, Route } from 'react-router-dom'
import Protected from "./components/Protected/Protected";
import { Register } from "./Pages/Login/Register";

function App() {
  return (
    <div className="App">
      <div className="AppMain">
        <Sidebar></Sidebar>
        <Routes>
          <Route path='/' element={ <Protected><MainDashboard></MainDashboard></Protected> }></Route>

          <Route path='/User' element={<Protected><UserPage></UserPage></Protected> }></Route>
          <Route path='/UserDetail/:id' element={<UserDetail></UserDetail>}></Route>

          <Route path='/Newspaper' element={<NewsPaper></NewsPaper>}></Route>
          <Route path='/NewspaperAdd' element={<NewsPaperAdd></NewsPaperAdd>}></Route>
          <Route path='/NewspaperDetail/:id' element={<NewsPaperDetail></NewsPaperDetail>}></Route>
          <Route path='/NewspaperEdit/:id' element={<NewsPaperEdit></NewsPaperEdit>}></Route>

          <Route path='/News' element={<News></News>}></Route>
          <Route path='/NewsDetail/:id' element={<NewsDetail></NewsDetail>}></Route>

          <Route path='/Login' element={<Login></Login>}></Route>
          <Route path="/Register" element={<Register />}></Route>
        </Routes>
      </div>
    </div>
  );
}

export default App;
