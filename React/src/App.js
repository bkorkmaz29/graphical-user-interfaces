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
import TimeSpent from './components/TimeSpent';



const App = () => {
  const [showAddEntry, setShowAddEntry] = useState(false)
  const [showAddProject, setShowAddProject] = useState(false)
  const [showUpdateEntry, setShowUpdateEntry] = useState(false)
  const [projects, setProjects] = useState([])
  //const [entries, setEntries] = useState([])
  const [entry, setEntry] = useState()
  const [projectCodes, setProjectCodes] = useState([])
  const [dailyEntries, setDailyEntries] = useState([])
  const [timeSpent, setTimeSpent] = useState(0)
  let a = new Date();
  let newDate = a.toISOString().split('T')[0];
  const [date, setDate] = useState(newDate);
 

/*
    useEffect(() => {
       axios 
        .get("http://localhost:5000/entries")
        .then((res) => {
          setDailyEntries(res.data.filter((entry) => entry.date === date));          
        })
        .catch((err) => {
          console.log(err);
        })
        
    }, []);

    useEffect(() => {
      axios 
       .get("http://localhost:5000/entries")
       .get("http://localhost:5000/projects")
       .then((res) => {
         setDailyEntries(res.data.filter((entry) => entry.date === date));    
         setProjects(res.data);
         setProjectCodes(projects.map(project => project.code));      
       })
       .catch((err) => {
         console.log(err);
       })
       
   }, [date]);*/

   useEffect(() => {
    const fetchData = async () => {
      const resEntry = await axios(
        `http://localhost:5000/entries`
      );
      const resProject = await axios(
        `http://localhost:5000/projects`
      );
      setDailyEntries(resEntry.data.filter((entry) => entry.date === date));    
      setProjectCodes(resProject.data.map(project => project.code));   
      let sumAll = resEntry.data.filter((entry) => entry.date === date).map(entry => parseInt(entry.time)).reduce((prev, curr) => prev + curr, 0);
      setTimeSpent(sumAll); 
    };

    fetchData();
  }, [date, showAddEntry, showAddProject, showUpdateEntry]);



/*
    useEffect(() => {


         let sumAll = dailyEntries.map(entry => parseInt(entry.time)).reduce((prev, curr) => prev + curr, 0);
         setTimeSpent(sumAll);

         


   }, []);




useEffect(() => {
  
  
  return () => {
    console.log("done daily")
  }
},[])*/


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
    axios.post(`http://localhost:5000/entries`, newEntry)
  }

  const deleteEntry = async (id) => {
    setDailyEntries(dailyEntries.filter((entry) => entry.id !== id))
     axios.delete(`http://localhost:5000/entries/${id}`)
   }

  const updateEntry = async (newEntry) => {
   // console.log(newEntry.id)
    //setEntries(entries.filter((e) => e.id !== entry.id))
  
    //console.log(newEntry)
   // setEntries([...entries, newEntry])
    axios.patch(`http://localhost:5000/entries/${newEntry.id}`, {code : newEntry.code, time : newEntry.time, description : newEntry.description })
    setShowUpdateEntry(!showUpdateEntry);
  }

  const showUpdate = (entry) => {
    setEntry(entry)
    setShowUpdateEntry(!showUpdateEntry);


  }

  return (
    <Router>
      <div className="flex flex-col justify-start w-screen">
      <Navbar />

        <div className="flex flex-col justify-center items-center basis-5/6">
          <div className="basis-1/4">
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
            <Routes>
              <Route
                path="/"
                element={
                  <>
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
                  </>
                }
              />
            </Routes>
          </div>
          <Entries
            entries={dailyEntries}
            onUpdate={showUpdate}
            onDelete={deleteEntry}
          />
        </div>
      </div>
    </Router>
  );
}

export default App;
