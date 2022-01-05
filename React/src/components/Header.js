import PropTypes from 'prop-types'


const Header = ({ title, onAdd, showAdd }) => {
   

  return (
    <div class="flex justify-center items-center justify-items-start m-3">
    <header>
      <h1  class="text-3xl font-bold text-primary">{title}</h1>
    </header>
    </div>
  )
}

Header.defaultProps = {
  title: 'Time Reporting System',
}

Header.propTypes = {
  title: PropTypes.string.isRequired,
}


export default Header
