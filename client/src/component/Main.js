import React,{useContext} from 'react'
import { BrowserRouter as Router,Routes,Route, Navigate } from 'react-router-dom'
import {DataContext} from '../GlobalContext'
import {ToastContainer} from 'react-toastify'
import ProtectedRoute from '../middleware/ProtectedRoute'
import Login from './Auth/Login'
import Register from './Auth/Register'
import About from './Default/About'
import Contact from './Default/Contact'
import Home from './Default/Home'
import Menu from './Header/Menu'
import Pnf from './util/Pnf'
import history from '../middleware/History'
import AdminProfile from './Admin/AdminProfile';
import AdminDashboard from './Admin/AdminDashboard'
import StudentDashboard from './Student/StudentDashboard'
import TrainerDashboard from './Trainer/TrainerDashboard'
import StudentProfile from './Student/StudentProfile'
import TrainerProfile from './Trainer/TrainerProfile'

function Main() {
  const context = useContext(DataContext)
  const [isLogged] = context.data.authApi.isLogged
  const [isAdmin] = context.data.authApi.isAdmin
  const [isStudent] = context.data.authApi.isStudent
  const [isTrainer] = context.data.authApi.isTrainer

  return (
   <Router history={history}>
        <Menu/>
        <ToastContainer autoClose={5000} position={'top-right'}/>
        <Routes>
            <Route path={`/`} element={
            isLogged ?
            (<>
            { isAdmin ? <Navigate to={`/admin/dashboard`}/>:null}
            { isStudent ? <Navigate to={`/student/dashboard`}/>:null}
            { isTrainer ? <Navigate to={`/trainer/dashboard`}/>:null}
            </>):<Home/>
            }/>
            <Route path={`/about`} element={ isLogged ? <Navigate to={`/*`} />:<About/>}/>
            <Route path={`/contact`} element={ isLogged ? <Navigate to={`/*`} />:<Contact/>}/>
            <Route path={`/login`} element={ isLogged ? <Navigate to={`/*`} />:<Login/>}/>
            <Route path={`/register`} element={ isLogged ? <Navigate to={`/*`} />:<Register/>}/>
            <Route path={`/*`} element={<Pnf/>}/>

            {
              isLogged && isAdmin ? ( 
                <Route element={<ProtectedRoute/>}>
                    <Route path={`/admin/dashboard`} element={<AdminDashboard/>}/>
                    <Route path={`/admin/profile`} element={<AdminProfile/>}/>
                </Route>) : null
            }

            {
              isLogged & isStudent ? ( 
                <Route element={<ProtectedRoute/>}>
                    <Route path={`/student/dashboard`} element={<StudentDashboard/>}/>
                    <Route path={`/student/profile`} element={<StudentProfile/>}/>
                </Route>) : null
            }

            {
              isLogged & isTrainer ? ( 
                <Route element={<ProtectedRoute/>}>
                    <Route path={`/trainer/dashboard`} element={<AdminDashboard/>}/>
                    <Route path={`/trainer/profile`} element={<AdminProfile/>}/>
                </Route>) : null
            }
        </Routes>
   </Router>
  )
}

export default Main