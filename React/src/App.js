import { useEffect, useState } from 'react'
import { v4 as uuidv4 } from 'uuid';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import axios from 'axios';

import Header from './components/Header';
import UpdateEntry from './components/UpdateEntry';
import Entries from './components/Entries';
import AddEntry from './components/AddEntry';
import AddProject from './components/AddProject';
import Control from './components/Control';
import Footer from './components/Footer';
import Sidebar from './components/Sidebar';

import Navbar from './components/Navbar';
import './App.css'



const App = () => {
  const [showAddEntry, setShowAddEntry] = useState(false)
  const [showAddProject, setShowAddProject] = useState(false)
  const [showUpdateEntry, setShowUpdateEntry] = useState(false)
  const [date, setDate] = useState('')
  const [projects, setProjects] = useState([])
  const [entries, setEntries] = useState([])
  const [entry, setEntry] = useState()
  const [projectCodes, setProjectCodes] = useState([])

  function fetchEntries() {

    axios.get('http://localhost:5000/entries')
      .then(res => {
        setEntries(res.data)
      })
      .catch(err => {
        console.log(err)
      })

  }

 // useEffect(() => fetchEntries(), [])
  /*
    function ProjectFetch() {
      useEffect(() => {
        axios.get('http://localhost:5000/projects')
        .then(res => {
          setProjects(res.data)
        })
        .catch(err =>{
          console.log(err)
        })
      }
      )
    }
  */

  const addProject = (project) => {
    setProjects([...projects, setProjects])
    setProjectCodes([ ...projectCodes, project.code])
    console.log(projectCodes)
  }

  const addEntry = async (entry) => {
    let id = uuidv4();
    let newEntry = { ...entry, date, id }

    setEntries([...entries, newEntry])

    axios.post(`http://localhost:5000/entries`, newEntry)
  }

  const deleteEntry = (id) => {
    setEntries(entries.filter((entry) => entry.id !== id))
    axios.delete(`http://localhost:5000/entries/${id}`)
  }

  const updateEntry = (entry) => {

    axios.patch(`http://localhost:5000/entries/${entry.id}`)
  }

  const showUpdate = (entry) => {
    setEntry(entry)
    setShowUpdateEntry(!showUpdateEntry);


  }

  return (
    <Router>
      <div className='flex flex-row justify-start w-screen'>
        <Sidebar />

       

        <div className='flex flex-col justify-center items-center basis-5/6'  >

          <div className='basis-1/4'>
            <Control onAddEntry={() => { setShowAddEntry(!showAddEntry); setShowAddProject(false) }}
              onAddProject={() => { setShowAddProject(!showAddProject); setShowAddEntry(false) }}
              onUpdateEntry={() => { setShowUpdateEntry(!showAddProject); setShowUpdateEntry(false) }}
              onChangeDate={(e) => setDate(e.target.value)}
            />
            <Routes>
              <Route path='/'
                element={<>
                  {showAddEntry && <AddEntry onAddEntry={addEntry} projectCodes={projectCodes} />}
                  {showAddProject && <AddProject onAddProject={addProject} />}
                  {showUpdateEntry && <UpdateEntry onUpdateEntry={updateEntry} entry={entry} />}
                </>
                } />
            </Routes>
            </div>
            <Entries entries={entries} onUpdate={showUpdate} onDelete={deleteEntry} />
          
        </div>
      </div>
    </Router>
  );
}

export default App;
