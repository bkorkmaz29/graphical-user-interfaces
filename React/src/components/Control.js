import React from 'react'
import Button from './Button'
import TimeSpent from './TimeSpent';
import { useState } from 'react'

const Control = ({ onAddProject, onAddEntry, onChangeDate, onUpdateEntry }) => {
    const [date, setDate] = useState(new Date());


    return (
        <div className='grid grid-flow-row grid-rows-2'>
            <div className="grid bg-indigo-50 mx-auto outline outline-secondary content-center m-6 rounded">
                <div className='outline outline-secondary  mb-2'>
                    <input type='date' onChange={onChangeDate} />
                    <Button color="green" text="Add Project" onClick={onAddProject} />
                    <Button color="green" text="Add Entry" onClick={onAddEntry} />
                </div>

            <TimeSpent timeSpent={12} />
            </div>
        </div>
    )
}

export default Control
