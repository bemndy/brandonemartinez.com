import React from 'react'
import './project.css'

export default function project({index, title, category, date, setModal}) {
  return (
      <div className="project" onMouseEnter={() => {setModal({active: true, index: index})}}
      onMouseLeave={() => {setModal({active: false, index: index})}}>
          <div className="project-title">{title}</div>
          <div className="project-category">{category}</div>
          <div className="project-date">{date}</div>
      </div>
  )
}
