import React from 'react'
import { Link } from 'react-router-dom';

function Sidebar() {
  return (
    <div className="flex flex-col border-r border-r-gray-300 h-screen  p-4 w-48">
        <Link to="/">Dashboard</Link>
        <Link to="/students">Students</Link>
        <Link to="/courses">Courses</Link>
        <Link to="/enrollments">Enrollments</Link>
    </div>
  )
}

export default Sidebar