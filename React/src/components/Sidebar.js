const Sidebar = () => {
    return (

        <div className="invisible fixed flex-col top-0 left-0 w-72 h-screen bg-blue-500 shadow-lg p-3 lg:visible lg:translate-x-0 transition duration-200 ease-in-out">
         
            <h1 className='flex justify-center h-1/6 font-bold text-yellow-500 text-6xl  text-shadow-lg m-3' >TRS</h1>
            <span className="w-full"> <Option text='Monthly Reports' /></span>

        </div>
    )
}



const Option = ({ text }) => {
    return (
        <div className='bg-blue-500 text-lg  h-16 w-full items-center text-center p-5  hover:bg-blue-300 text-white hover:text-xl hover:text-black cursor-pointer'>
            {text}
        </div>
    )
}


export default Sidebar