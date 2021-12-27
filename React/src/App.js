import Header from './components/Header';
import Entries from './components/Entries';
import { useState } from 'react'

function App() {


  const [entries, setEntries] = useState([ {
    "date": "2021-11-07 ",
    "code": "ARGUS-123 ",
    "time": 45,
    "description": "data import "
},
{
    "date": "2021-11-07 ",
    "code": "OTHER ",
    "time": 120,
    "description": "picie kawy "
},
{
  "date": "2021-11-08 ",
  "code": "ARGUS-123 ",
  "time": 45,
  "description": "kompilacja "
},
{
    "date": "2021-11-08 ",
    "code": "OTHER ",
    "time": 120,
    "description": "office arrangement "
},
{
    "date": "2021-11-12 ",
    "code": "ARGUS-123 ",
    "time": 45,
    "description": "project meeting "
}])
 
  const deleteEntry = (key) => {
    setEntries(key,entries.filter((entry) => entry.key !== key))
  }

  return (
    <div className="container">
     <Header/>
     <Entries entries={entries} onDelete={deleteEntry} />
     
    </div>
  );
}

export default App;
