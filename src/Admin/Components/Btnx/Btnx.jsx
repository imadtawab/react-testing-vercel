import { NavLink } from 'react-router-dom'
import './Btnx.scss'

export default function Btnx({size, children ,element,to, type , onClick , btnStyle , color ,width, loading, style, disabled , htmlFor , flex}) {
    // children
    // element = a || button || div || label
    // to = href
    // type = for button
    // onClick = function()
    // btnStyle = outline || bg
    // color = danger || success || primary
    // style
  return (
    <div style={flex ? {flex: +flex , ...style} : style} className={`Btnx ${btnStyle ? btnStyle : ''} ${color ? color : ""} ${width === "full" ? "width-full" : ''} ${size ? size : ""}`}>
        {element === "a" && (
            <NavLink onClick={onClick} to={to}>{children}</NavLink>
        )}
        {element === "button" && (
            <button style={style} disabled={loading || disabled} onClick={onClick} type={type? type : ""}>
              {loading ? <span className='loading-circle'></span> : children}
            </button>
        )}
        {element === "div" && (
            <div className={loading ? "disabled" : ""} onClick={onClick}>
              {loading ? <span className='loading-circle'></span> : children}
            </div>
            
        )}
        {element === "label" && (
        <label htmlFor={htmlFor} className={loading ? "disabled" : ""} onClick={onClick}>
        {loading ? <span className='loading-circle'></span> : children}
        </label>

)}
    </div>
    
  )
}
