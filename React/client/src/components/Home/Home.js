import { useEffect, useState, createContext, useContext } from 'react'
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
    const [user, setUser] = useState('')


    const [showAddEntry, setShowAddEntry] = useState(false)
    const [showAddProject, setShowAddProject] = useState(false)
    const [showUpdateEntry, setShowUpdateEntry] = useState(false)
    //const [projects, setProjects] = useState([])
    //const [entries, setEntries] = useState([])
    const [entry, setEntry] = useState()
    const [projectCodes, setProjectCodes] = useState([])
    const [dailyEntries, setDailyEntries] = useState([])
    const [timeSpent, setTimeSpent] = useState(0)
    let a = new Date();
    let newDate = a.toISOString().split('T')[0];
    const [date, setDate] = useState(newDate);
    const [month, setMonth] = useState(newDate.slice(0, -3))
    const location = useLocation()
    const { from } = location.state
  

    useEffect(() => {
      
      setUser(from.user);
      console.log(user);
    

  }, []);

    
    
    useEffect(() => {
        const fetchData = async () => {
          const resEntry = await axios(
            `http://localhost:5000/entries/${from.user}`
          );
          const resProject = await axios(
            `http://localhost:5000/projects`
          );
          setDailyEntries(resEntry.data.entries.filter((entry) => entry.date === date));
          setProjectCodes(resProject.data.projects.map((project) => project.code));
         // let sumAll = resEntry.data.entries.filter((entry) => entry.date === date).map(entry => parseInt(entry.time)).reduce((prev, curr) => prev + curr, 0);
          //setTimeSpent(sumAll);
         // setUser(from.user);
        };
    
        fetchData();
      }, [user, date, showAddEntry, showAddProject, showUpdateEntry]);

      useEffect(() => {
        
          
          let sumAll = dailyEntries.filter((entry) => entry.date === date).map(entry => parseInt(entry.time)).reduce((prev, curr) => prev + curr, 0);
          setTimeSpent(sumAll);
        
        
    
       
      }, [dailyEntries]);
    

    const addProject = async (project) => {
        setShowAddProject(!showAddProject)
        //setProjects([...projects, setProjects])
        //setProjectCodes([ ...projectCodes, project.code])
    
        axios.post(`http://localhost:5000/projects`, project)
      }
    
      const addEntry = async (entry) => {
        setShowAddEntry(!showAddEntry);
        setEntry(entry);
        let id = uuidv4();
        let newEntry = { ...entry, date, id }
    
    
        // setEntries([...entries, newEntry])
        // setDailyEntries(...dailyEntries, entry);  
        axios.post(`http://localhost:5000/entries/${from.user}`, newEntry)
      }
    
      const deleteEntry = async (id) => {
        setDailyEntries(dailyEntries.filter((entry) => entry.id !== id))
        axios.delete(`http://localhost:5000/entries/${from.user}/${id}`)
      }
    
      const updateEntry = async (newEntry) => {
        // console.log(newEntry.id)
        //setEntries(entries.filter((e) => e.id !== entry.id))
    
        //console.log(newEntry)
        // setEntries([...entries, newEntry])
        axios.patch(`http://localhost:5000/entries/${from.user}/${newEntry.id}`, { code: newEntry.code, time: newEntry.time, description: newEntry.description })
        setShowUpdateEntry(!showUpdateEntry);
      }
    
      const showUpdate = (entry) => {
        setEntry(entry)
        setShowUpdateEntry(!showUpdateEntry);
    
    
      }




    return <div className="flex flex-col w-screen items-center justify-center">
        <Navbar username={user} />
        <Control
            onAddEntry={() => {
                setShowAddEntry(!showAddEntry);
                setShowAddProject(false);
            }}
            onAddProject={() => {
                setShowAddProject(!showAddProject);
                setShowAddEntry(false);
            }}
            onUpdateEntry={() => {
                setShowUpdateEntry(!showAddProject);
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
            <UpdateEntry onUpdateEntry={updateEntry} entry={entry} />
        )}   
        <Entries
            entries={dailyEntries}
            onUpdate={showUpdate}
            onDelete={deleteEntry}
        />
    </div>;
};

export default Home;


