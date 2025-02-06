import { useState } from 'react'
import MobileDesign from './components/mobileDesign'
import DesktopDesign from './components/desktopDesign'

import './App.css'


function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <div className='h-full min-h-[100vh] text-white md:hidden relative bg-white'>
        <MobileDesign />
      </div>

       {/* Desktop design */}
      <div className='hidden md:block text-white'>
        <DesktopDesign />
      </div>
    </>
  )
}

export default App
