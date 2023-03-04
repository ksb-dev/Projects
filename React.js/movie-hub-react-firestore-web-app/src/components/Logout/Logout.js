import React from 'react'

import { useGlobalContext } from '../../context/context'
import { useLogOut } from '../../hooks/useLogOut'

import './Logout.css'

const Logout = ({ log }) => {
  const { toggleMode } = useGlobalContext()
  const { logout } = useLogOut()

  const hide = () => {
    log.current.style.transform = 'translateX(100%)'
  }

  return (
    <div
      ref={log}
      className={toggleMode === 'white' ? 'logout dark' : 'logout light'}
    >
      <h4>Do you want to logout?</h4>
      <div className='options'>
        <h5 onClick={logout}>Yes</h5>
        <h5 onClick={hide}>No</h5>
      </div>
    </div>
  )
}

export default Logout
