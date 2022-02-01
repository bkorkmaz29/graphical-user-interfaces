import { useEffect, useState } from 'react'
import { v4 as uuidv4 } from 'uuid';
import { useLocation } from 'react-router-dom'
import axios from 'axios';

import UpdateEntry from './UpdateEntry';
import Entries from './Entries';
import AddEntry from './AddEntry';
import AddProject from './AddProject';
import Control from './Control';
import Navbar from './Navbar';


const Home = () => {
  const location = useLocation()
  const { from } = location.state
  const [user, setUser] = useState(from.user)
  const [showAddEntry, setShowAddEntry] = useState(false)
  const [showAddProject, setShowAddProject] = useState(false)
  const [showUpdateEntry, setShowUpdateEntry] = useState(false)
  const [entry, setEntry] = useState()
  const [projectCodes, setProjectCodes] = useState([])
  const [entries, setEntries] = useState([])
  const [dailyEntries, setDailyEntries] = useState([])
  const [timeSpent, setTimeSpent] = useState(0)
  let a = new Date();
  let newDate = a.toISOString().split('T')[0];
  const [date, setDate] = useState(newDate);
  const [month, setMonth] = useState(newDate.slice(0, -3));
  
  useEffect(() => {
    const fetchProjects = async () => {
      const resProjects = await axios(
        `http://localhost:5000/projects`
      );
      
      setProjectCodes(resProjects.data.projects.map((project) => project.code));
    };
    
    fetchProjects();
    
  }, []);


  useEffect(() => {
    
    setMonth(date.slice(0, -3));
 
}, [date]);


useEffect(() => {

  const fetchEntries = async () => {
    const resEntries = await axios(
      `http://localhost:5000/entries/${from.user}/${month}`
    );
    setEntries(resEntries.data.entries);
  };

  fetchEntries();
  fetchEntries();
}, [month, from.user]);


useEffect(() => {

  setDailyEntries(entries.filter((entry) => entry.date === date));

}, [entries, date]);


  useEffect(() => {
    let sumAll = dailyEntries.map(entry => parseInt(entry.time)).reduce((prev, curr) => prev + curr, 0);
    
    setTimeSpent(sumAll);
  }, [dailyEntries]);

  const addProject = async (project) => {
    setShowAddProject(!showAddProject)
    setProjectCodes([...projectCodes, project.code])
   
   await axios.post(`http://localhost:5000/projects`, project)
  }

  const addEntry = async (entry) => {
    setShowAddEntry(!showAddEntry);
    setEntry(entry.code);
    let id = uuidv4();
    let newEntry = { ...entry, date, id };
    setEntries([...entries, newEntry]);

    await axios.post(`http://localhost:5000/entries/${from.user}/${month}`, newEntry)
    
  }

  const deleteEntry = async (id) => {
    setEntry(id)
    setEntries(entries.filter((entry) => entry.id !== id))
    await axios.delete(`http://localhost:5000/entries/${from.user}/${month}/${id}`)
  }

  const updateEntry = async (newEntry) => {
    const entryToUpdate = entries.find((entry) => entry.id === newEntry.id);

    entryToUpdate.code = newEntry.code;
    entryToUpdate.subcode = newEntry.subcode;
    entryToUpdate.time = newEntry.time;
    entryToUpdate.description = newEntry.description;

    axios.patch(`http://localhost:5000/entries/${from.user}/${month}/${newEntry.id}`, { code: newEntry.code, subcode: newEntry.subcode, time: newEntry.time, description: newEntry.description })
    setShowUpdateEntry(!showUpdateEntry);
  }

  const showUpdate = (entry) => {
    setEntry(entry)
    setShowUpdateEntry(!showUpdateEntry);
    setShowAddProject(false);
    setShowAddEntry(false);
  }

  return (
    <div className="flex flex-col w-screen items-center justify-center">
      <Navbar username={user} />
      <Control
        onAddEntry={() => {
          setShowAddEntry(!showAddEntry);
          setShowAddProject(false);
          setShowUpdateEntry(false);
        }}
        onAddProject={() => {
          setShowAddProject(!showAddProject);
          setShowAddEntry(false);
          setShowUpdateEntry(false);
        }}

        onChangeDate={(e) => setDate(e.target.value)}
        timeSpent={timeSpent}

      />
      {showAddEntry && (
        <AddEntry
          onAddEntry={addEntry}
          projectCodes={projectCodes}
        />
      )}
      {showAddProject && <AddProject onAddProject={addProject} />}
      {showUpdateEntry && (
        <UpdateEntry onUpdateEntry={updateEntry} onBack={() => {
          setShowUpdateEntry(!showUpdateEntry);
        }} 
        
        entry={entry} 
      
      />
      )}
      <Entries
        entries={dailyEntries}
        onUpdate={showUpdate}
        onDelete={deleteEntry}
      />
    </div>
  )
};

export default Home;


