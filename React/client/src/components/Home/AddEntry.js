import { useState } from 'react'
import Select from 'react-select'

const AddEntry = ({ onAddEntry, projectCodes }) => {
  const [code, setCode] = useState('')
  const [subcode, setSubcode] = useState('')
  const [time, setTime] = useState('')
  const [description, setDescription] = useState('')

  let opts = []

  projectCodes.forEach(element => {

    const obj = ({ value: element, label: element })

    opts = [...opts, obj]
  });


  const onSubmit = (e) => {
    e.preventDefault()


    if (!code || !subcode || !time || !description) {
      alert('Please fill all the fields')
      return
    }

    onAddEntry({ code, time, subcode, description })

    setCode('')
    setSubcode('')
    setTime('')
    setDescription('')
  }

  return (
    <form className='bg-blue-400 bg-opacity-25 rounded-md outline outline-slate-700 p-3 mb-2' onSubmit={onSubmit}>


      <div className='grid grid-cols-3 gap-3'>
        <div className='col-span-2 col-start-1 row-start-1 row-end-1 grid grid-rows-3 w-1/2 gap-4'>
          <Select
            options={opts}
            onChange={(e) => setCode(e.value)}
            placeholder='Select Code'
          />
          <input
            type='text'
            placeholder='Enter Subcode'
            value={subcode}
            onChange={(e) => setSubcode(e.target.value)}
            maxLength='10'
          />
      
          <input
            type='number'
            placeholder='Enter Time'
            value={time}
            onChange={(e) => setTime(e.target.value)}
            max='999'
          />
          <input
            type='text'
            placeholder='Enter Description'
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            maxLength='20'
          />
        </div>

        <div className='relative col-start-3 col-end-3 row-start-1 row-end-1 col-span-1'>
          <input className='absolute bottom-0 w-full  bg-yellow-500 p-3 rounded outline outline-white cursor-pointer hover:bg-yellow-600 '
            type='submit'
            value='Submit'
          />
        </div>

      </div>



    </form>
  )
}

export default AddEntry
