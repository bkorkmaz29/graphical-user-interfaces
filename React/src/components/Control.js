import React from 'react'
import Button from './Button'
import { useState } from 'react'

const Control = ({onAddProject, onAddEntry}) => {
    const [startDate, setStartDate] = useState(new Date());
    return (
        <div className="flex bg-indigo-50 mx-auto outline outline-secondary content-center m-6 rounded">
             
        <input type='date'/>
        <Button color="green" text="Add Project" onClick={onAddProject}/>
        <Button color="green" text="Add Entry" onClick={onAddEntry}/>
        
         </div> 
      
        
    )
}

export default Control
