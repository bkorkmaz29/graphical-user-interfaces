import Header from './components/Header';
import Entries from './components/Entries';
import AddEntry from './components/AddEntry';
import Control from './components/Control';
import { useState } from 'react'
import { v4 as uuidv4 } from 'uuid';
const App = () => {


  const [entries, setEntries] = useState([ {
    "id": uuidv4(),
    "date": "2021-11-07 ",
    "code": "ARGUS-123 ",
    "time": 45,
    "description": "data import "
},
{
    "id": uuidv4(),
    "date": "2021-11-07 ",
    "code": "OTHER ",
    "time": 120,
    "description": "picie kawy "
},
{
    "id": uuidv4(),
    "date": "2021-11-08 ",
    "code": "ARGUS-123 ",
    "time": 45,
    "description": "kompilacja "
},
{
    "id": uuidv4(),
    "date": "2021-11-08 ",
    "code": "OTHER ",
    "time": 120,
    "description": "office arrangement "
},
{
    "id": uuidv4(),
    "date": "2021-11-12 ",
    "code": "ARGUS-123 ",
    "time": 45,
    "description": "project meeting "
}])
  const addEntry = (entry) => {
    const id = uuidv4();
    const newEntry = {id,...entry}
    setEntries([...entries, newEntry])

  }

  const deleteEntry = (id) => {
    setEntries(entries.filter((entry) => entry.id !== id))
    
    //console.log(key)
  }

  return (
    <div className="container">
     <Header/>
     <Control/>
     <AddEntry onAdd={addEntry}/>
     <Entries entries={entries} onDelete={deleteEntry} />
     
    </div>
  );
}

export default App;
