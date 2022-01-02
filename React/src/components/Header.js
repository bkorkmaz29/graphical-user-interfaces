import PropTypes from 'prop-types'




const Header = ({ title, onAdd, showAdd }) => {
   

  return (
    <header>
      <h1>{title}</h1>
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
