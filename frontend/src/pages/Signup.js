import React from 'react'
import { useState } from 'react';
import { useSignup } from '../hooks/useSignup.js';
import '../styles/Signup.css'

const Signup = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { signup, error, isLoading } = useSignup();

  const handleSubmit = async (e) => {
    e.preventDefault();
    //console.log({username, email, password});
    signup({ username, email, password });
  }

  return (
    <div className='signup-div'>
      <div className='signup-header'>
        <h3>Signup</h3>
      </div>
      <div className='signup-form'>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="inputUsername" className="form-label">Username</label>
            <input type="text" className="form-control" id="inputUsername"
              value={username}
              onChange={(e) => (setUsername(e.target.value))} />
          </div>
          <div className="mb-3">
            <label htmlFor="inputEmail" className="form-label">Email address</label>
            <input type="email" className="form-control" id="inputEmail"
              value={email}
              onChange={(e) => setEmail(e.target.value)} />
          </div>
          <div className="mb-3">
            <label htmlFor="inputPassword" className="form-label">Password</label>
            <input type="password" className="form-control" id="inputPassword"
              value={password}
              onChange={(e) => setPassword(e.target.value)} />
          </div>
          <button type="submit" className="btn btn-primary" disabled={isLoading}>Submit</button>
          {error && <div className='error'>{error}</div>}
        </form>
      </div>
    </div>
  )
}

export default Signup