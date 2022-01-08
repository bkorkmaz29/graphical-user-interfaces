import { useState } from 'react'

const UpdateEntry = ({ onUpdateEntry, entry }) => {
  const [code, setCode] = useState(entry.code)
  const [time, setTime] = useState(entry.time)
  const [description, setDescription] = useState(entry.description)

  const onSubmit = (e) => {
    e.preventDefault()

    onUpdateEntry({ code, time, description })

  }

  return (
    <form className='m-3 bg-blue-400 bg-opacity-25 rounded-md outline outline-blue-500 p-3' onSubmit={onSubmit}>
      <div>
        <input
          type='text'
          placeholder='Enter Code'
          value={code}
          onChange={(e) => setCode(e.target.value)}
          className='mt-1'
        />
      </div>
      <div>
        <input
          type='text'
          placeholder='Enter Time'
          value={time}
          onChange={(e) => setTime(e.target.value)}
          className='mt-1'
        />
      </div>
      <div>
        <input
          type='text'
          placeholder='Enter Description'
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
         <input className='bg-yellow-500 p-3 ml-3 rounded mt-1 outline outline-white cursor-pointer hover:bg-yellow-600 ' type='submit' value='Update'/>
      </div>

     
    </form>
  )
}

export default UpdateEntry