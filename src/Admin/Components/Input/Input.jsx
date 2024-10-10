import { useState } from 'react'
import './Input.scss'
import {NavLink} from 'react-router-dom'

export default function Input({link, required, type, name, id, value, placeholder, onChange, label}) {
    const [error, setError] = useState(false)
    const onBlur = (e) => {
      if(!required) return
        if(!e.target.value) {
            setError("The input is required")
        }else{
            setError(false)
        }
    }
  return (
    <div className={`Input${error?" error": ""}`}>
    <label htmlFor={id}>{label}{required&& <span className="required">*</span>}</label>
    <input onBlur={onBlur} required={required} placeholder={placeholder} value={value} onChange={onChange} type={type || "text"} name={name} id={id}/>
    {required && error ? <span className="error">{error}</span> : false}
    { link?.length === 2 && <NavLink to={link[1]} className="link">{link[0]}</NavLink>}
    </div>
  )
}
