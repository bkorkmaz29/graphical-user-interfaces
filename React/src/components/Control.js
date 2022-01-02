import React from 'react'
import Button from './Button'
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useState } from 'react'

const Control = () => {
    const [startDate, setStartDate] = useState(new Date());
    return (
        <div className="controller">
             
        <span>Select Date</span> <DatePicker selected={startDate} onChange={(date) => setStartDate(date)} />
        <Button color="green" text="Add Project"/>
        <Button color="blue" text="Add Entry"/>
        
         </div> 
      
        
    )
}

export default Control
