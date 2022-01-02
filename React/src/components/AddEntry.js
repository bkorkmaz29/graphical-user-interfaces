import { useState } from 'react'

const AddEntry = ({ onAdd }) => {
  const [code, setCode] = useState('')
  const [date, setDate] = useState('')
  const [time, setTime] = useState('')
  const [description, setDescription] = useState('')

  const onSubmit = (e) => {
    e.preventDefault()

    if (!code) {
      alert('Please enter a code')
      return
    }

    onAdd({ code, date, time, description })

    setCode('')
    setDate('')
    setTime('')
    setDescription('')
  }

  return (
    <form className='add-form' onSubmit={onSubmit}>
      <div className='form-control'>
        <label>Task :</label>
        <input
          type='text'
          placeholder='Enter Code'
          value={code}
          onChange={(e) => setCode(e.target.value)}
        />
      </div>
      <div className='form-control'>
        <label>Date :</label>
        <input
          type='text'
          placeholder='Enter Date'
          value={date}
          onChange={(e) => setDate(e.target.value)}
        />
      </div>
      <div className='form-control'>
        <label>Time :</label>
        <input
          type='integer'
          placeholder='Enter Time'
          value={time}
          onChange={(e) => setTime(e.target.value)}
        />
      </div>
      <div className='form-control'>
        <label>Description :</label>
        <input
          type='text'
          placeholder='Enter Description'
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
      </div>

      <input type='submit' value='Add Entry' className='btn btn-block' />
    </form>
  )
}

export default AddEntry
