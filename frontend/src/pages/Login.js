import React, { useState } from 'react'
import { useLogin } from '../hooks/useLogin';
import '../styles/Login.css';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const { login, error, isLoading } = useLogin();

  const handleSubmit = async (e) => {
    e.preventDefault();
    //console.log("Handle submit:", {username,password});
    login({ username, password });

    //console.log({username, password});
  }

  return (
    <div className='login-div'>
      <div className='login-header'>
        <h3>Login</h3>
      </div>
      <div className='login-form'>
        <form onSubmit={handleSubmit}>
          <div className="form-outline mb-4">
            <label htmlFor="inputUsername" className="form-label">Username</label>
            <input type="text" className="form-control" id="inputUsername"
              value={username}
              onChange={(e) => (setUsername(e.target.value))} />
          </div>
          <div className="form-outline mb-4">
            <label htmlFor="inputPassword" className="form-label">Password</label>
            <input type="password" className="form-control" id="inputPassword"
              value={password}
              onChange={(e) => setPassword(e.target.value)} />
          </div>
          <button type="submit" className="btn btn-primary btn-block mb-4" disabled={isLoading}>Submit</button>
          {error && <div className='error'>{error}</div>}
        </form>
      </div>
    </div>
  )
}

export default Login