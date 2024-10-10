import { useRef } from 'react';
import './Switcher.scss'

export default function Switcher({active, key, onClick}) {
    // const ref = useRef()
    // const onClickk = () => {
    //     ref.current.classList.toggle("active")
    // }
  return (
    <div key={key} className='Switcher'>
        <span onClick={onClick} className={`switcher-btn${active ? " active" : ""}`}></span>
    </div>
  )
}
