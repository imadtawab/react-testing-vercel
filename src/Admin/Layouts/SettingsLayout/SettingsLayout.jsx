import { NavLink, Outlet, useNavigate } from 'react-router-dom'
import './SettingsLayout.scss'
import PageStructure from '../../Components/PageStructure/PageStructure'
import SectionStructure from '../../Components/SectionStructure/SectionStructure'
import { FaUserAlt, FaDollarSign } from "react-icons/fa";
import { IoMdSettings } from "react-icons/io";
import { MdLocalShipping } from "react-icons/md";


import { useEffect } from 'react';


export default function SettingsLayout() {
  return (
    <PageStructure title="Settings">
        <div className='SettingsLayout'>
            <div className="settings-sidebar">
                {/* <SectionStructure pd="none"> */}
                    <ul>
                        <li><NavLink to="account"><FaUserAlt/>Account</NavLink></li>
                        <li><NavLink to="general"><IoMdSettings/>General</NavLink></li>
                        <li><NavLink to="shipping"><MdLocalShipping/>Shipping</NavLink></li>
                        <li><NavLink to="payment"><FaDollarSign/>Payment</NavLink></li>
                    </ul>
                {/* </SectionStructure> */}
            </div>
            <div className="settings-content">
                <SectionStructure pd="none">
                    <Outlet/>
                </SectionStructure>
            </div>
                {/* <div className="header-settings">
                    <ul>
                        <li><NavLink to={"/admin/settings"} end>Profile</NavLink></li>
                        <li><NavLink to={"/admin/settings/password"}>Password</NavLink></li>
                        <li><NavLink to={"/admin/settings/notification"}>Notification</NavLink></li>
                        <li><NavLink to={"/admin/settings/integration"}>Integration</NavLink></li>
                        <li><NavLink to={"/admin/settings/billing"}>Billing</NavLink></li>
                    </ul>
                </div> */}
            {/* <div className="main-content-settings">
              <Outlet/>
            </div> */}
        </div>
    </PageStructure>
  )
}
