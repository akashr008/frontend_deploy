import { useState } from 'react'
import './App.css'
import { Route, Routes } from 'react-router-dom'
import Login from './components/auth/Login'
import Main from './components/Main'
import Register from './components/auth/Register'
import Home from './components/ui/Home'
import Jobs from './components/ui/Jobs'
import Unavbar from './components/navbar/Unavbar'
import Jobcard from './components/employee/Jobcard'
import Addjobs from './components/employee/Addjobs'
import JobDetails from './components/ui/JobDetails'
import Mains from './components/Mains'
import Adminjob from './components/admin/Adminjob'
import ManageUsers from './components/admin/ManageUsers'
import Profile from './components/ui/Profile'
import AppliedJobTable from './components/jobseeker/AppliedJobTable'
import Applicants from './components/employee/Applicants'
import EmployerRegister from './components/auth/EmployerRegister'
import ManageEmployers from './components/admin/ManageEmployers'
import UserInterface from './components/ui/UserInterface'
import PrivateRoutes from '../PrivateRoutes'



function App() {
  const [count, setCount] = useState(0)

  return (
    <>
   <Routes>
   <Route path='/login' element={<Main child={<Login/>}/>}></Route>
   <Route path='/' element={<UserInterface/>}></Route>
   <Route path='/jobseeker-registeration' element={<Register/>}></Route>
   <Route path='/employer-registeration' element={<EmployerRegister/>}></Route>
    
   <Route element={<PrivateRoutes/>}>
    <Route path='/jobs' element={<Jobs/>}> </Route>
    <Route path='/jobseeker' element={<Unavbar/>}></Route>
    <Route path='/job-cards' element={<Jobcard/>}></Route>
    <Route path='/Home' element={<Mains child1={<Home/>}/>}></Route>
    <Route path='/add-jobs' element={<Addjobs/>}></Route>
    <Route path='/job-details/:jobId' element={<JobDetails/>}></Route>
    <Route path='/admin-job' element={<Adminjob/>}></Route>
    <Route path='/manage-jobseekers' element={<ManageUsers/>}></Route>
    <Route path='/manage-employers' element={<ManageEmployers/>}></Route>
    <Route path='/profile' element={<Profile/>}></Route>
    <Route path='/applied-job/:jobseekerId' element={<AppliedJobTable/>}></Route>
    <Route path='/applicants' element={<Applicants/>}></Route>
    </Route>
   </Routes>
  
    </>
  )
}

export default App
