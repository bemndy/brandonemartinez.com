import React from 'react'
import './Project.css'

export default function Project({index, title, category, date, setModal}) {
  return (
      <div className="project" onMouseEnter={() => {setModal({active: true, index: index})}}
      onMouseLeave={() => {setModal({active: false, index: index})}}>
          <div className="project-title">{title}</div>
          <div className="project-date">{date}</div>
      </div>
  )
}
