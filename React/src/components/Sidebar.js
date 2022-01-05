const Sidebar = () => {
    return (
       
        <div className="invisible fixed flex-col top-0 left-0 w-56 h-screen bg-blue-500 shadow-lg p-3 lg:visible lg:translate-x-0 transition duration-200 ease-in-out">
            <MobileMenu/>
            <h1 className='flex justify-center h-1/6 font-bold text-white text-5xl  text-shadow-lg m-3' >TRS</h1>
            <Option text='Monthly Reports'/>
        </div>
    )
}



const Option = ({text}) => {
    return (
        <div className='bg-yellow-500 outline outline-white h-16 w-full block items-center text-black text-center p-5 rounded-2xl hover:bg-yellow-600 cursor-pointer'>
            {text}
        </div>
    )
}

const MobileMenu = () => {
    return (
        <div className='visible fixed flex-col top-0 left-0 w-24 h-screen bg-blue-500 shadow-lg p-3 lg:invisible lg:translate-x-0 transition duration-200 ease-in-out'>
            <h1 className='flex justify-center h-1/6 font-bold text-white text-5xl  text-shadow-lg m-3' >TRS</h1>
            <Option text='Reports'/>
        </div>
    )
}

export default Sidebar