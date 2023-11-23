import './App.css';
import Sidebar from './Pages/SideBar';
import RequestAccountPage from './Pages/RequestAccountPages.tsx';
import RequestAccountPageDetails from './Pages/RequestAccountPageDetails.tsx';
import ApprovalPages from './Pages/ApprovalPages.tsx';
import ApprovalPageDetails from './Pages/ApprovalPageDetails.tsx';
import DeclinePage from './Pages/DeclinePage.tsx';
import DeclinePageDetails from './Pages/DeclinePageDetails.tsx';
import UserDetails from './Pages/UserDetails'; 
import AllAccountPage from './Pages/AllAccountPage.tsx';
import AllAccountPageDetails from './Pages/AllAccountPageDetails.tsx';
import Homepage from './Pages/Homepage';
import {Routes, Route,  } from 'react-router-dom';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <div>
          
        <Sidebar />
            <Routes>
              <Route exact path='/' element={<Homepage/>}/>
              <Route exact path='/request-account' element={<RequestAccountPage/>}/>
              <Route exact path='/requestAccountPageDetails/:username' element={<RequestAccountPageDetails/>} />
              <Route exact path='/request-accountdetails' element={<RequestAccountPage/>}/>
              <Route exact path='/approved-accounts' element={<ApprovalPages/>}/>
              <Route exact path='/ApprovalPageDetails/:username' element={<ApprovalPageDetails/>} />
              <Route exact path='/decline-accounts' element={<DeclinePage/>}/>
              <Route exact path='/DeclinePageDetails/:username' element={<DeclinePageDetails/>} />
              <Route exact path='/all-request-account' element={<AllAccountPage/>}/>
              <Route exact path='/AllAccountPageDetails/:username' element={<AllAccountPageDetails/>} />
            </Routes> 
          </div>
      </header>
    </div>
  );
}

export default App;
