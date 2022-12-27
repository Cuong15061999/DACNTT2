import './App.css';
import { MainDashboard } from './Pages/MainDashboard/MainDashboard';
import { UserPage } from './Pages/UserPage/UserPage';
import { UserDetail } from './Pages/UserDetail/UserDetail';
import { NewsPaper } from './Pages/NewsPaper/NewsPaper';
import { NewsPaperDetail } from './Pages/NewsPaperDetail/NewsPaperDetail';
import { News } from './Pages/News/News';
import { NewsDetail } from './Pages/NewsDetail/NewsDetail';
import { Login } from './Pages/Login/Login';
import { Sidebar } from './components/Sidebar/Sidebar';
import { Routes, Route } from 'react-router-dom'

function App() {
  return (
    <div className="App">
      <div className='AppMain'>
        <Sidebar></Sidebar>
        <Routes>
          <Route path='/' element={<MainDashboard></MainDashboard>}></Route>
          <Route path='/User' element={<UserPage></UserPage>}></Route>
          <Route path='/UserDetail/:id' element={<UserDetail></UserDetail>}></Route>
          <Route path='/Newspaper' element={<NewsPaper></NewsPaper>}></Route>
          <Route path='/NewspaperDetail/:id' element={<NewsPaperDetail></NewsPaperDetail>}></Route>
          <Route path='/News' element={<News></News>}></Route>
          <Route path='/NewsDetail/:id' element={<NewsDetail></NewsDetail>}></Route>
          <Route path='/Login' element={<Login></Login>}></Route>
        </Routes>
      </div>
    </div>
  );
}

export default App;
