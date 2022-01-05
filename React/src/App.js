import { useState } from 'react'
import { v4 as uuidv4 } from 'uuid';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { axios } from "axios";

import Header from './components/Header';
import Entries from './components/Entries';
import AddEntry from './components/AddEntry';
import AddProject from './components/AddProject';
import Control from './components/Control';
import Footer from './components/Footer';
import Sidebar from './components/Sidebar';
import './App.css'



const App = () => {
  const [showAddEntry, setShowAddEntry] = useState(false)
  const [showAddProject, setShowAddProject] = useState(false)
  const [projects, setProjects] = useState([])
  const [entries, setEntries] = useState([])



const addProject = (project) => {
  setProjects([...projects, setProjects])
}

  const addEntry = (entry) => {
    const id = uuidv4();
    const newEntry = {id,...entry}
    setEntries([...entries, newEntry])

  }

  const deleteEntry = (id) => {
    setEntries(entries.filter((entry) => entry.id !== id))

  }

  return (
    <Router>
      <div class='relative flex flex-row justify-center items-center'>
      <Sidebar/>
    <div class="flex flex-col justify-center items-center w-1/2"  >
      
     
     <Control onAddEntry={() => setShowAddEntry(!showAddEntry)} onAddProject={() => setShowAddProject(!showAddProject)}/>
      <Routes>
      <Route path='/'
     element = {   <>
      {showAddEntry && <AddEntry onAdd={addEntry}/>}
      {showAddProject && <AddProject onAdd={addProject}/>}
      {entries.length > 0 ? (
      <Entries entries={entries} onDelete={deleteEntry} />)
      : (
         'No Tasks To Show'
        )}
     </>

   } />

     </Routes>
     <div class='self-end'>
    
     </div>
     </div>
    </div>
    </Router>
  );
}

export default App;
