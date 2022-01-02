import { FaTrash } from 'react-icons/fa'
import { FaEdit } from 'react-icons/fa'

const Entry = ({ entry, onDelete }) => {
  return (
    <div className="task">
      <h3>
        {entry.code}{' '}
        <div className="icons">
          <FaEdit size={28}/>
          <FaTrash
            size={28}
            style={{ color: 'red', cursor: 'pointer' }}
            onClick={() => onDelete(entry.id)}
          />
        </div>
      </h3>
      <p>{entry.description}</p>
      <p>{entry.time} minutes</p>
  
    </div>
    
  )
}

export default Entry
