
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './App.css'
import Body from './components/Body'
import LandingPage from './components/LandingPage'
import Login from './components/Login'
import Profile from './components/Profile'
import { Provider } from 'react-redux'
import appStore from './utils/appStore'
import Feed from './components/Feed'
import Connections from './components/Connections'
import Request from './components/Request'
import Premium from './components/Premium'
import Chat from './components/Chat'
import ProtectedRoutes from './components/ProtectedRoutes'

function App() {

  return (
    <>
      <Provider store={appStore}>

          <BrowserRouter basename='/'>
          <Routes>


            

              <Route  element={<Body/>}>
              <Route path='/' element={<LandingPage />} />

              <Route path='/login' element={<Login/>}/>

              <Route element={<ProtectedRoutes/>}>

                  <Route path='/feed' element={<Feed/>}/>
                  <Route path='/connections' element={<Connections/>}/>
                  <Route path='/request' element={<Request/>}/>

                  <Route path='/profile' element={<Profile/>}/>
                  <Route path='/premium' element={<Premium/>}/>
                  <Route path='/chat/:targetUserId' element={<Chat/>}/>
                  
             </Route>



            
            </Route>


          </Routes>
        
        </BrowserRouter>

      </Provider>
      
    </>
  )
}

export default App
