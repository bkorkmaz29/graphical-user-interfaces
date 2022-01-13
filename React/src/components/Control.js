import React from 'react'
import Button from './Button'
import TimeSpent from './TimeSpent';
import { useState } from 'react'

const Control = ({ onAddProject, onAddEntry, onChangeDate, onUpdateEntry, timeSpent }) => {


    let date = new Date();

    return (
        <div className='grid grid-flow-row grid-rows-1 m-3 rounded'>
            <div className="grid bg-indigo-50 mx-auto outline outline-secondary content-center m-6 rounded">
                <div className='outline outline-secondary rounded  mb-2'>
                    <input type='date' defaultValue={date.toISOString().split('T')[0]} onChange={onChangeDate} />
                    <Button color="green" text="Add Project" onClick={onAddProject} />
                    <Button color="green" text="Add Entry" onClick={onAddEntry} />
                </div>

            <TimeSpent timeSpent={timeSpent} />
            </div>
        </div>
    )
}

export default Control
