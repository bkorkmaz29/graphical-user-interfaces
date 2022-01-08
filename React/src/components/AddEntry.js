import { useState } from 'react'

const AddEntry = ({ onAddEntry }) => {
  const [code, setCode] = useState('')
  const [time, setTime] = useState('')
  const [description, setDescription] = useState('')

  const onSubmit = (e) => {
    e.preventDefault()

    if (!code) {
      alert('Please enter a code')
      return
    }

    onAddEntry({ code, time, description })

    setCode('')
    setTime('')
    setDescription('')
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
         <input className='w-1/4  bg-yellow-500 p-3 ml-7 rounded mt-1 outline outline-white cursor-pointer hover:bg-yellow-600 ' type='submit' value='Submit'/>
      </div>

     
    </form>
  )
}

export default AddEntry
