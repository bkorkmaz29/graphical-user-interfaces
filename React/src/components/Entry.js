import { FaTrash } from 'react-icons/fa'
import { FaEdit } from 'react-icons/fa'

const Entry = ({ entry, onDelete }) => {
  return (
    <div class='flex max-w-5xl rounded bg-neutral-300 p-2 m-1 hover:bg-indigo-200 outline outline-red-500'>
        <div class="flex flex-col basis-1/2 m-2">
          <h2>
          <a class="font-semibold">Code : </a> {entry.code}{' '}
          </h2>
          <p><a class="font-semibold">Description : </a> {entry.description}</p>
          <p><a class="font-semibold">Time Spent : </a> {entry.time} minutes</p>
        </div>
      <div class='flex rounded justify-center items-center outline  basis-1/2 m-4'>
        <FaEdit size={28} class="basis-1/2"/>
        <FaTrash
          class=" basis-1/2"
          size={28}
          style={{ color: 'red', cursor: 'pointer' }}
          onClick={() => onDelete(entry.id)}
        />
        </div>
    </div>
    
  )
}

export default Entry

