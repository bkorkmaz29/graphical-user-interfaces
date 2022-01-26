import { useState } from 'react'

const UpdateEntry = ({ onUpdateEntry, onBack, entry }) => {
  const [code, setCode] = useState(entry.code)
  const [subcode, setSubcode] = useState(entry.subcode)
  const [time, setTime] = useState(entry.time)
  const [description, setDescription] = useState(entry.description)
  const [date, setDate] = useState(entry.date)
  const [id, setId] = useState(entry.id)

  const onSubmit = (e) => {
    e.preventDefault()

    onUpdateEntry({ code, subcode, time, description, date, id })
    setCode('')
    setSubcode('')
    setTime(0)
    setDate('')
    setId('')
    setDescription('')

  }

  return (
    <form className='bg-blue-400 bg-opacity-25 rounded-md outline outline-slate-700 p-3 mb-2' onSubmit={onSubmit}>
      <div className='grid grid-cols-3 gap-3'>
        <div className='col-span-2 col-start-1 row-start-1 row-end-1 grid grid-rows-3 w-1/2 gap-4'>
          <div className='mt-4'>
            <label> <span className='font-bold text-lg '>Code: </span> {code} </label>
          </div>
          <div>
            <input
              type='text'
              placeholder='Enter Subcode'
              value={subcode}
              onChange={(e) => setSubcode(e.target.value)}
              className='mt-1'
            />
          </div>
          <div>
            <input
              type='number'
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
          </div>
        </div>

        <div className=' relative flex flex-col justify-end col-start-3 col-end-3 row-start-1 row-end-1 col-span-1'>
          <input className=' w-full  bg-yellow-500 p-3 m-1 rounded outline outline-white cursor-pointer hover:bg-yellow-600 '
            type='submit'
            value='Update'
          />
          <input className=' w-full  bg-red-600 m-1 p-3 rounded outline outline-white cursor-pointer hover:bg-red-700 '
            type='button' value='Back'
            onClick={onBack}
          />
        </div>
      </div>
    </form>
  )
}

export default UpdateEntry