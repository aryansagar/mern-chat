import { useState } from 'react'
import axios from "axios";

import './App.css'
import Register from './Register'

function App() {
    axios.defaults.baseURL = 'http://localhost:4040';
    axios.defaults.withCredentials = true
  return (
  <Register />
  )
}

export default App
