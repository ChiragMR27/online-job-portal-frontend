import React from 'react'
import { Link } from 'react-router-dom'

const Sidebar = () => {
  return (
    <div>
        <div className="header">
            <h1>Find Jobs</h1>
        </div>
        <div className="routes">
             <ul>
             <Link><li>filter</li></Link>
             <Link> <li>job-hosting</li></Link>
             <Link><li>job-list</li></Link>

             </ul>
        </div>
    </div>
  )
}

export default Sidebar
