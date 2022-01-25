import React from 'react'

function Navbar({username}) {
    return (
        <div className='flex flex-row bg-slate-700 relative w-screen top-0 h-16 shadow-lg shadow-slate-300'>
            <h1 className='h-1/6 font-bold text-yellow-500 text-6xl m-3 basis-2/6' >TRS</h1>
            <span className='basis-3/6'></span>
        <h3 className='basis-1/6 text-center text-white text-lg m-3 inline-block align-middle'>Welcome {username} </h3>
        </div> 
    )
}

export default Navbar

