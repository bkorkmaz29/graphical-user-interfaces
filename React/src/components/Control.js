import React from 'react'
import Button from './Button'
import TimeSpent from './TimeSpent';
import { useState } from 'react'

const Control = ({ onAddProject, onAddEntry, onChangeDate, onUpdateEntry, timeSpent }) => {


    let date = new Date();

    return (
        <div className='grid grid-flow-row grid-rows-1 m-3 rounded'>
            <div className="grid bg-slate-700 mx-auto p-1 content-center m-6 rounded shadow-lg">
                <div className=' mb-2'>
                    <input type='date' defaultValue={date.toISOString().split('T')[0]} onChange={onChangeDate} />
                    <Button text="Add Project" onClick={onAddProject} />
                    <Button text="Add Entry" onClick={onAddEntry} />
                </div>

            <TimeSpent timeSpent={timeSpent} />
            </div>
        </div>
    )
}

export default Control
