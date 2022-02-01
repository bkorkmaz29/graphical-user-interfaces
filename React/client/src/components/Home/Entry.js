import { FaTrash } from 'react-icons/fa'
import { FaEdit } from 'react-icons/fa'

const Entry = ({ entry, onUpdate, onDelete }) => {
  return (
    <div className="flex flex-row rounded bg-neutral-100  m-1 outline hover:bg-indigo-200 ">
      <div className="flex flex-row basis-3/4 m-1 bg-yellow-50 rounded w-full p-1 ">
        <div className='flex flex-col basis-1/2 '>
          <span className='font-bold '>Code:</span>
          <span className='font-bold'> Subcode:</span>
          <span className='font-bold'>Description:</span>
          <span className='font-bold'>Time:</span>
        </div>
        <div className='flex flex-col basis-1/2'>
          <h2>
            <span className="text-xl "> {entry.code}</span>
          </h2>
          <span className="text-lg "> {entry.subcode}</span>
          <span className="text-xs sm:text-base md:text-md">{entry.description}</span>
          <span className='text-md' > {entry.time} minutes</span>
        </div>
      </div>
      <div className="flex rounded justify-center items-center outline  basis-1/4 m-3 p-2 shadow-white">
        <FaEdit
          size={28}
          className="basis-1/2 cursor-pointer"
          onClick={() => onUpdate(entry)}
        />
        <FaTrash
          className=" basis-1/2 cursor-pointer"
          size={28}
          style={{ color: "red" }}
          onClick={() => onDelete(entry.id)}
        />
      </div>
    </div>
  );
}

export default Entry

