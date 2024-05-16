import { Route, Routes } from 'react-router-dom'
import './App.css'
import Home from './Pages/Home'
import Header from './Components/Header'
import Add from './Components/Add'
import { useState } from 'react'
function App() {

 const [addEmployeeResponse, setAddEmployeeResponse] = useState("")


  return (
    <>
      <Header/>
      <Routes>
        <Route element={<Home addEmployeeResponse={addEmployeeResponse}/>} path='/'></Route>
        <Route element={<Add setAddEmployeeResponse={setAddEmployeeResponse}/>} path='/add'></Route>
      </Routes>
    </>
  )
}

export default App
