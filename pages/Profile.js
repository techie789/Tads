import React, { useState } from 'react'
import { getAuth, signOut } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import useUser from '../hooks/useUser';

const Profile = () => {
  const { user } = useUser();
  console.log(user);
  const navigate = useNavigate();
  
  return (
    <>
    <h1>Your Profile</h1>
    {
      user !== null 
      ? <>
      <h2>Hello! {user.displayName}</h2>
      <h2>Your Email: {user.email}</h2>
      <p>{user.phoneNumber}</p>
      </>
      : null
    }
    {user
        ? <button onClick={() => signOut(getAuth())}>Log Out</button>
        : <button onClick={() => navigate('/login')}>Log in</button>}
    </>
  )
}

export default Profile