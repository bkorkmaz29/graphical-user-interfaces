import { FaTrash } from 'react-icons/fa'
import { FaEdit } from 'react-icons/fa'

const Entry = ({ entry, onUpdate, onDelete }) => {
  return (
    <div className='flex max-w-5xl rounded bg-neutral-300 p-2 m-1 hover:bg-indigo-200 outline outline-red-500'>
      <div className="flex flex-col basis-1/2 m-2 bg-white rounded outline-dashed items-center">
        <h2>
          <span className="font-semibold text-xl ">{entry.code}{' '}</span> 
        </h2>
        <p> {entry.description}</p>
        <p> {entry.time} minutes</p>
      </div>
      <div className='flex rounded justify-center items-center outline  basis-1/2 m-4'>
        <FaEdit size={28}
          className="basis-1/2 cursor-pointer"
          onClick={() => onUpdate(entry)}
        />
        <FaTrash
          className=" basis-1/2 cursor-pointer"
          size={28}
          style={{ color: 'red' }}
          onClick={() => onDelete(entry.id)}
        />
      </div>
    </div>

  )
}

export default Entry

