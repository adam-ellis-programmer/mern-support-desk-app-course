import { FaSignInAlt, FaSignOutAlt, FaUser } from 'react-icons/fa'
import { Link, useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { logout, reset } from '../features/auth/authSlice'
import React from 'react'

function AppHeader() {
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const { user } = useSelector((state) => state.auth)

  const onLogout = () => {
    dispatch(logout())
    dispatch(reset())
    navigate('/')
  }
  return (
    <header className="header">
      <div className="logo">
        <Link to="/"> Support desk</Link>
      </div>
      <ul>
        {user ? (
          <li>
            {' '}
            <button onClick={onLogout} className="btn">
              <FaSignOutAlt /> Logout
            </button>{' '}
          </li>
        ) : (
          <>
            <li>
              <Link to="/login">
                {' '}
                <FaSignInAlt /> Log In
              </Link>
            </li>
            <li>
              <Link to="/register">
                {' '}
                <FaUser /> Register
              </Link>
            </li>
          </>
        )}
      </ul>
    </header>
  )
}

export default AppHeader
