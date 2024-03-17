import React from 'react'
import { useAuthContext } from '../hooks/useAuthContext'

const Profile = () => {
  const { user } = useAuthContext();
  return (
    <div>
      <h1>
        Profile
      </h1>
      <div>
        <div>
          <p>
            Username: {user.username}
          </p>
        </div>
        <div>
          <p>
            Email: {user.email}
          </p>
        </div>
      </div>
    </div>
  )
}

export default Profile