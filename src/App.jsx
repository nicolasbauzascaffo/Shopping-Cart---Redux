import './App.css'
import { Route, Routes } from 'react-router-dom'
import Layout from './components/layout'
import Home from './pages/home'

function App() {


  return (
    <div className='app' >
      <Routes>
        <Route path='/' element={<Layout/>} >
          <Route index element={<Home/>} />
        </Route>
      </Routes>
    </div>
  )
}

export default App
