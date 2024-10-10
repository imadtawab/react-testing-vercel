import './SettingStructure.scss'
import { NavLink } from 'react-router-dom'

export default function SettingStructure({children, navbar=[]}) {
  return (
    <div className='SettingStructure'>
        <div className="setting-structure-navbar">
            <ul>
                {navbar.map((nav,i) => (
                    <li><NavLink to={nav.path} end={i === 0}>{nav.name}</NavLink></li>
                ))}
            </ul>
        </div>
        <div className="setting-structure-content">
            {children}
        </div>
    </div>
  )
}
