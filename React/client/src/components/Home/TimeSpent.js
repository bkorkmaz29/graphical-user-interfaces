function TimeSpent({timeSpent}) {
    return (
        <div className="grid grid-flow-col grid-col-2 grid-rows-1 h-1/4 ">
         <p className="text-center text-white">Total time spent today is <span className="text-yellow-500">{timeSpent}</span>  minutes </p> 
        </div>
    )
}

export default TimeSpent
