import './App.css'
import { MainPage } from './Pages/MainPage'
import { UserPage } from './Pages/UserPage'
import {BrowserRouter, Navigate, Route, Routes} from 'react-router-dom' 


function App() {

  return (
    <>
    <BrowserRouter>
      <Routes> 
        <Route path='*' element = {<Navigate to='/form' />} />
        <Route path='/form' Component = { MainPage } />
        <Route path='/user/:user_id' Component = { UserPage } />
      </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
