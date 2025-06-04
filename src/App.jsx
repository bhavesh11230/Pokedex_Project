import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import Pokedex from './components/pokedex/pokedex'
import './App.css'
import CustomRoutes from './routes/customroutes'
import { Link } from 'react-router-dom'
function App() {


  return (
    <div className='outer-pokedex'>
      <h1 id="pokedex-heading">
        <Link to="/">Pokedex </Link>
      </h1>
      <CustomRoutes />
    </div>
  )
}

export default App
