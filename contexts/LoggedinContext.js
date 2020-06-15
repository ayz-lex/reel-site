import React from 'react'

export const LoggedinContext = React.createContext({
  isLoggedIn: false,
  toggleLoggedIn: () => {}
})

