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
    <form className='bg-blue-400 bg-opacity-25 rounded-md outline outline-slate-700 p-3 mb-2' onSubmit={onSubmit}>

      <div className='grid grid-cols-3 gap-3'>
        <div className='col-span-2 col-start-1  row-start-1 row-end-1 grid grid-rows-3 w-1/2 gap-4'>
          <input
            type='text'
            placeholder='Enter Code'
            value={code}
            onChange={(e) => setCode(e.target.value)}
            className='mt-1'
          />

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
              type='number'
              placeholder='Enter Budget'
              value={budget}
              onChange={(e) => setBudget(e.target.value)}
            />

          </div>
        </div>

        <div className='relative col-start-3 col-end-3 row-start-1 row-end-1 col-span-1'>
          <input className='absolute bottom-0 w-full  bg-yellow-500 p-3 rounded outline outline-white cursor-pointer hover:bg-yellow-600 '
            type='submit'
            value='Submit' />
        </div>

      </div>
    </form>
  )
}

export default AddProject
