const Sidebar = () => {
    return (

        <div className="basis-1/6 flex flex-col h-screen bg-blue-500 shadow-lg  lg:translate-x-0 transition duration-200 ease-in-out">
            <h1 className='text-center h-1/6 font-bold text-yellow-500 text-6xl  text-shadow-lg m-3' >TRS</h1>
            <span className="w-full"> <Option text='Monthly Reports' /></span>
        </div>
    )
}



const Option = ({ text }) => {
    return (
        <div className='bg-blue-500 text-lg  h-16 w-full items-center text-center p-5  hover:bg-blue-300 text-white hover:text-black cursor-pointer'>
            {text}
        </div>
    )
}


export default Sidebar