import * as React from 'react'
import { container, heading } from './layout.module.css'

const Layout = ({ pageTitle, children }) => {
  return (
    <div className={container}>
      <nav>
        Top nav
      </nav>
      <main>
        <h1 class={heading}>{pageTitle}</h1>
        {children}
      </main>
    </div>
  )
}

export default Layout
