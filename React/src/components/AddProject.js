import { useState } from 'react'

const AddProject = ({ onAddProject }) => {
  const [code, setCode] = useState('')
  const [manager, setManager] = useState('')
  const [name, setName] = useState('')
  const [budget, setBudget] = useState('')

  const onSubmit = (e) => {
    e.preventDefault()

    if (!code) {
      alert('Please enter a code')
      return
    }

    onAddProject({ code, manager, name, budget })

    setCode('')
    setManager('')
    setName('')
    setBudget('')
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
          placeholder='Enter Manager'
          value={manager}
          onChange={(e) => setManager(e.target.value)}
          className='mt-1'
        />
      </div>
      <div>
        <input
          type='text'
          placeholder='Enter Name'
          value={name}
          onChange={(e) => setName(e.target.value)}
          className='mt-1'
        />
      </div>
      <div>
        <input
          type='text'
          placeholder='Enter Budget'
          value={budget}
          onChange={(e) => setBudget(e.target.value)}
        />
        <input className='bg-yellow-500 p-3 ml-3 rounded mt-1 outline outline-white cursor-pointer hover:bg-yellow-600' type='submit' value='Submit'/>
      </div>

      
    </form>
  )
}

export default AddProject
