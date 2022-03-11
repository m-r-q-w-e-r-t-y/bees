import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Login from './components/login/Login'
import Register from './components/register/Register'

const NotFound = () => {

  return(
    <React.Fragment>
        <h1 style={{fontSize: '10rem', color:'blue'}}>Not Found</h1>
    </React.Fragment>
  )
}

function App() {
  return (
    <div className="App">
      <header className="App-header">
      </header>
        <Routes>
          <Route path="*" element={<Login></Login>} />
          <Route path="/register" element={<Register></Register>} />   
        </Routes>
    </div>
  );
}

export default App;