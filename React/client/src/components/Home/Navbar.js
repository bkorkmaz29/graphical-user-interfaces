import React from 'react'
import { Link } from 'react-router-dom'

function Navbar({ username }) {
    return (
        <div className='flex flex-row bg-slate-700 relative w-screen top-0 h-16 shadow-lg shadow-slate-300'>
            <h1 className='h-1/6 font-bold text-yellow-500 text-6xl  basis-3/12' >TRS</h1>
            <span className='basis-5/12'></span>

            <div className='flex flex-row justify-end basis-4/12'>
                <Link className='cursor-pointer hover:bg-blue-500' to='/'>
                    <h3 className='text-center text-white text-lg m-3 inline-block align-middle'>Change User </h3>
                </Link>
                <h3 className='text-center text-white text-lg m-3 inline-block align-middle'>Welcome {username} </h3>
            </div>
        </div>
    )
}

export default Navbar

