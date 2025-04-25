import React from 'react'
import './project.css'

export default function project({index, title, category, date, setModal}) {
  return (
    <div className="project" onMouseEnter={() => {setModal({active: true, index: index})}}
    onMouseLeave={() => {setModal({active: false, index: index})}}>
        <h2>{title}</h2>
        <div>{category}</div>
        <div>{date}</div>
    </div>
  )
}
