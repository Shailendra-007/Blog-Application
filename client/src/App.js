// import logo from './logo.svg';
import './App.css';
import DataProvider from './context/DataProvider';
import { BrowserRouter, Routes, Route, Navigate, Outlet } from 'react-router-dom'
import { useState } from 'react';


// Components
import Login from './components/accounts/login';
import Home from './components/home/Home';
import Header from './components/header/Header';
import CreatePost from './components/create/CreatePost';
import DetailView from './components/Details/DetailsView';
import Update from './components/create/Update';


//Create private route to check user is Authenticaed or not.
const PrivateRoute = ({ isAuthenticated , ...props }) =>{
  return isAuthenticated ?
  <>
  <Header/>    {/*Header is used here beacause we dont want to show in Login page.*/}
  <Outlet/> 
  </>
  :< Navigate replace to='/login'/>
}


function App() {
  // useState for user is login or not.
  const [isAuthenticated , isUserAuthenticated] = useState(false);

  return (
    <DataProvider>
      <BrowserRouter>
        <div style={{ marginTop: 64 }}>
          <Routes>
            <Route path='/login' element={<Login  isUserAuthenticated={ isUserAuthenticated } /> /* Passed as props. */}/>

            <Route path='/' element={<PrivateRoute isAuthenticated={isAuthenticated} />}>  
              <Route path='/' element={<Home/>}/>
            </Route>

            <Route path='/create' element={<PrivateRoute isAuthenticated={isAuthenticated} />}>  
              <Route path='/create' element={<CreatePost/>}/>
            </Route>

            <Route path='/details/:id' element={<PrivateRoute isAuthenticated={isAuthenticated} />}>  
              <Route path='/details/:id' element={<DetailView/>}/>
            </Route>

            <Route path='/update/:id' element={<PrivateRoute isAuthenticated={isAuthenticated} />}>  
              <Route path='/update/:id' element={<Update/>}/>
            </Route>

          </Routes>
        </div>
      </BrowserRouter>
    </DataProvider>
  );
}

export default App;


//To pass the data in react component we use props and children . The DataProvider is wrapped between all and if 
//we use with a opening & closing angle bracket then it is children.
  
//To render from Login to Home we use URL based Routing (Install npm i react-router-dom).URL change = Component Change.

// BrowserRouter,Routes,Route-part of react-dom and if user login successfully then we have to render Login to Home page
// we use useNavigate package from react.(Login.jsx file)
