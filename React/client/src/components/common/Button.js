import PropTypes from 'prop-types'

const Button = ({ color, text, onClick }) => {
  return (
    <button
      onClick={onClick}
      style={{ backgroundColor: color }}
      className="bg-secondary font-medium px-4 py-2 rounded m-3 text-white  hover:bg-blue-300"
    >
      {text}
    </button>
  )
}


Button.propTypes = {
  text: PropTypes.string,
  color: PropTypes.string,
  onClick: PropTypes.func,
}

export default Button
