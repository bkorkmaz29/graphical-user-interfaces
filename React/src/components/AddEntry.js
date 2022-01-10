import { useState } from 'react'
import Select from 'react-select'

const AddEntry = ({ onAddEntry, projectCodes }) => {
  const [code, setCode] = useState('aa')
  const [time, setTime] = useState('')
  const [description, setDescription] = useState('')

  const opts = []

       projectCodes.forEach(element => {
      opts.push ( { value: element, label: element })
    });
  


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


      <div className='grid grid-cols-2 gap-3'>
        <div className='col-span-2 col-start-1 col-end-1 row-start-1 row-end-1 grid grid-rows-3 w-1/2 gap-4'>
          <Select
            options={opts}
            onChange={(e) => setCode(e.value)}
            placeholder='Select Code'

          />

          <input
            type='text'
            placeholder='Enter Time'
            value={time}
            onChange={(e) => setTime(e.target.value)}

          />
          <input
            type='text'
            placeholder='Enter Description'
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>

        <div className='relative col-start-2 col-end-2 row-start-1 row-end-1 col-span-1'>
          <input className='absolute bottom-0 w-full  bg-yellow-500 p-3 rounded outline outline-white cursor-pointer hover:bg-yellow-600 '
            type='submit'
            value='Submit' />
        </div>

      </div>



    </form>
  )
}

export default AddEntry
