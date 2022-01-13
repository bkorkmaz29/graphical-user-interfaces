import { FaTrash } from 'react-icons/fa'
import { FaEdit } from 'react-icons/fa'

const Entry = ({ entry, onUpdate, onDelete }) => {
  return (
    <div className="flex flex-row rounded bg-neutral-100  m-1 outline hover:bg-indigo-200 ">
      <div className="flex flex-col basis-3/4 m-1 bg-white rounded  items-center">
        <h2>
          <span className="font-semibold text-xl ">{entry.code}</span>
        </h2>
        <p> {entry.description}</p>
        <p> {entry.time} minutes</p>
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

