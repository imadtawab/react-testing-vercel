import { NavLink } from 'react-router-dom'
import './Btn.scss'

export default function Btn({children, element, to, loading, disabled, onClick, width}) {
  return (
    <>
    {element === "a" ?  <NavLink className={`Btn${width === "full" ? " width-full" : ""}`} to={to}>{children}</NavLink> :
                        <button onClick={onClick} disabled={disabled || loading} className={`Btn${loading? " loading": ""}${width === "full" ? ' width-full' : ""}`}>{children}{loading ? <span className='loading-circle'></span>: ""}</button>
    }
    </>
  )
}
