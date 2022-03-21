import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Login from './components/login/Login'
import Register from './components/register/Register'
import ForgetPassword from './components/forgetPassword/ForgetPassword'
import ChangePassword from './components/changePassword/ChangePassword'
import Folder from './components/folder/Folder'
import NavBar from "./components/navBar/NavBar";

function App() {
  return (
    <div className="App">
      <header className="App-header"></header>
      <NavBar />
      <Routes>
        <Route path="*" element={<Login></Login>} />
        <Route path="/register" element={<Register></Register>} />
        <Route path="/forgot" element={<ForgetPassword></ForgetPassword>} />
          <Route path="/reset" element={<ChangePassword></ChangePassword>} />
          <Route path="/folder" element={<Folder></Folder>} />
      </Routes>
    </div>
  );
}

export default App;
