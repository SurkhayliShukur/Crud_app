import React from 'react'
import { Routes, Route } from "react-router-dom"
import './App.css'
import Navbar from './Components/Navbar'
import Add from './Components/Add'
import Home from './Components/Home'
import { ToastContainer } from "react-toastify";

function App() {


  const Tabs = [
    {
      name: "Home",
      path: "/",
      element: <Home />
    },
    {
      name: "Add",
      path: "/add",
      element: <Add />
    },
  ]

  return (
    <>
      <Navbar Tabs = {Tabs} />
      <Routes>
        {
          Tabs.map((item, key) => (

            <Route key={key}
              path={item.path}
              element={item.element}
            />
          ))
        }
      </Routes>
      <ToastContainer />
    </>
  )
}

export default App
