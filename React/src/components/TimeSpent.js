function TimeSpent({timeSpent}) {
    return (
        <div className="grid grid-flow-col grid-col-2 grid-rows-1 h-1/4 ">
         <p className="text-center">Total time spent today </p> 
         <p className="text-center">{timeSpent}</p>
        
          
        </div>
    )
}

export default TimeSpent
