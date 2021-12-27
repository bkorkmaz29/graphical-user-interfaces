import PropTypes from 'prop-types'
import Button from './Button'
import DatePicker from "react-datepicker";
import { useState } from 'react'
import "react-datepicker/dist/react-datepicker.css";

const Header = ({ title, onAdd, showAdd }) => {
    const [startDate, setStartDate] = useState(new Date());

  return (
    <header>
      <h1>{title}</h1>
    
    <div>
        <span>Select Date</span> <DatePicker selected={startDate} onChange={(date) => setStartDate(date)} />
    </div> 
      
    </header>
  )
}

Header.defaultProps = {
  title: 'Time Reporting System',
}

Header.propTypes = {
  title: PropTypes.string.isRequired,
}


export default Header
