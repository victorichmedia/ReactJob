import {Route, createBrowserRouter, createRoutesFromElements, RouterProvider} from 'react-router-dom'
import Homepage from './pages/Homepage'
import MainLayout from './layouts/MainLayout'
import JobsPage from './pages/JobsPage'
import NotFoundPage from './pages/NotFoundPage'
import JobPage, { jobLoader} from './pages/JobPage'
import AddJobPage from './pages/AddJobPage'
import EditJobPage from './pages/EditJobPage'



const App = () => {

  const addJob = async (newJob) => {

    // Add New Job
    const res = await fetch('/api/jobs', {
      method: 'POST',
      headers: {
        'content-Type': 'application/json' 
      },
      body: JSON.stringify(newJob)
    });
    return;
  };

  // Add Delete Job
  const deleteJob = async (id) => {
    const res = await fetch(`/api/jobs/${id}`, {
      method: 'DELETE',
    });
    return;
  }

  // Update Job 
  const updateJob = async (job) => {
    const res = await fetch(`/api/jobs/${job.id}`, {
      method: 'PUT',
      headers: {
        'content-Type': 'application/json' 
      },
      body: JSON.stringify(job)
    });
    return;
  }
  
  const router = createBrowserRouter(
    createRoutesFromElements(
    <Route path="/" element={<MainLayout />}>       
      <Route index element={<Homepage />}/>
      <Route path='/jobs' element={<JobsPage />}/>
      <Route path='/add-job' element={<AddJobPage addJobSubmit={addJob} />}/>
      <Route path='/job/:id' element={<JobPage  deleteJob={deleteJob}/>} loader={jobLoader}/>
      <Route path='edit-job/:id' element={<EditJobPage updateJobSubmit={updateJob}/>} loader={jobLoader}/>
      <Route path='*' element={<NotFoundPage />}/>
    </Route>)
  );

  return <RouterProvider router={router}/> 
}

export default App