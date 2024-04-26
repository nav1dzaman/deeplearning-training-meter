import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Meter from './components/Meter'

function App() {
  

  return (
    <>
     <div className='bg-blue-200 text-center text-xl font-bold'>Deep Learning Training Meter</div>
     <div>
      <Meter/>
     </div>
    </>
  )
}

export default App
