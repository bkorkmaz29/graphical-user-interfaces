import { Link } from 'react-router-dom'
import { useState } from 'react'
import axios from 'axios';
import Button from './common/Button';


const Login = () => {
  const [user, setUser] = useState({});
  /* 
      const handleLogin = async () => {
        console.log(user)
        await axios.post(`http://localhost:5000/user`, user)
  
      }
  */
  return (
    <div className='flex outline h-screen'>
      <div className='bg-blue-400 bg-opacity-25 rounded-md m-auto outline outline-slate-700 p-4'>

        <input
          type='text'
          placeholder='Enter username'
          onChange={(e) => setUser(e.target.value)}
        />

        <Link className='cursor-pointer' to='/Home' state={{ from: { user } }}>
          <Button text='Login' />
        </Link>
      </div>
    </div>
  );
}

export default Login;
